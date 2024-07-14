import { useState, useEffect } from "react";
import axios from "axios";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const FullTemplate = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/templates")
      .then((response) => {
        setTemplates(response.data);
        if (response.data.length > 0) {
          setSelectedTemplate(response.data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching templates:", error);
      });
  }, []);

  const selectTemplate = (template) => {
    setSelectedTemplate(template);
  };

  const next = () => {
    const newIndex = currentIndex + 4;
    if (newIndex < templates.length) {
      setCurrentIndex(newIndex);
    }
  };

  const previous = () => {
    const newIndex = currentIndex - 4;
    if (newIndex >= 0) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex items-center max-w-5xl m-auto justify-center flex-col">
        {selectedTemplate && (
          <>
            <img
              src={`http://localhost:8000/images/large/${selectedTemplate.image}`}
              alt="Large Template"
              className="w-1/2 max-h-96"
            />
            <div className="w-1/2">
              <p>
                <strong>Title:</strong> {selectedTemplate.title}
              </p>
              <p>
                <strong>Description:</strong> {selectedTemplate.description}
              </p>
              <p>
                <strong>Cost:</strong> ${selectedTemplate.cost}
              </p>
              <p>
                <strong>ID #:</strong> {selectedTemplate.id}
              </p>
              <p>
                <strong>Thumbnail File:</strong> {selectedTemplate.thumbnail}
              </p>
              <p>
                <strong>Large Image File:</strong> {selectedTemplate.image}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="flex gap-4 mb-4 items-center justify-center mt-4">
        <span
          className={`previous ${currentIndex === 0 ? "disabled" : ""}`}
          onClick={previous}
        >
          <GrFormPrevious
            className={`text-3xl rounded-full cursor-pointer border-2 ${
              currentIndex === 0
                ? "text-red-500 border-red-500"
                : "text-blue-400 border-blue-400"
            }`}
          />
        </span>
        <div className="flex space-x-4">
          {templates.slice(currentIndex, currentIndex + 4).map((template) => (
            <a
              key={template.id}
              href="#"
              onClick={() => selectTemplate(template)}
              className={`p-2 ${selectedTemplate && selectedTemplate.id === template.id ? "border-4 border-blue-400" : "border"}`}
            >
              <img
                src={`http://localhost:8000/images/thumbnails/${template.thumbnail}`}
                alt={`Thumbnail ${template.id}`}
                width="145"
                height="121"
              />
              <span>{template.id}</span>
            </a>
          ))}
        </div>
        <span
          className={`next ${
            currentIndex + 4 >= templates.length ? "disabled" : ""
          }`}
          onClick={next}
        >
          <MdNavigateNext
            className={`text-3xl cursor-pointer rounded-full border-2 ${
              currentIndex + 4 >= templates.length
                ? "text-red-500 border-red-500"
                : "text-blue-400 border-blue-400"
            }`}
          />
        </span>
      </div>
    </div>
  );
};

export default FullTemplate;
