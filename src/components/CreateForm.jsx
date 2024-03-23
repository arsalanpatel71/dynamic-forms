import React, { useState } from "react";
// import JSONInput from "react-json-editor-ajrm";
// import locale from "react-json-editor-ajrm/locale/en";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

const CreateForm = () => {
  const initialFormConfig = JSON.stringify(
    [
      {
        type: "radio",
        label: "Gender:",
        name: "gender",
        options: [
          { label: "Girl", value: "girl" },
          { label: "Boy", value: "boy" },
        ],
      },
      {
        type: "text",
        label: "Favorite Flower",
        name: "favoriteFlower",
        placeholder: "Enter your favorite flower",
        condition: {
          field: "gender",
          equals: "girl",
        },
      },
      {
        type: "text",
        label: "Favorite Sport",
        name: "favoriteSport",
        placeholder: "Enter your favorite sport",
        condition: {
          field: "gender",
          equals: "boy",
        },
      },
      {
        type: "file", // Example type
        label: "New Field",
        name: "newFieldName",
        placeholder: "A new field",
        validation: {
          required: true,
          fileTypes: [".pdf", ".docx"],
        },
      },
      {
        type: "text",
        label: "First Name",
        name: "firstName",
        placeholder: "Enter your first name",
        validation: {
          required: true,
          minLength: 2,
          maxLength: 30,
        },
      },
      {
        type: "email",
        label: "Email Address",
        name: "email",
        placeholder: "Enter your email",
        validation: {
          required: true,
          pattern: "[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+",
        },
      },
      {
        type: "select",
        label: "Favorite Color",
        name: "favoriteColor",
        options: [
          {
            label: "Red",
            value: "red",
          },
          {
            label: "Green",
            value: "green",
          },
          {
            label: "Blue",
            value: "blue",
          },
        ],
        validation: {
          required: true,
        },
      },
      {
        type: "email",
        label: "Email Address",
        name: "email",
        placeholder: "Enter your email",
        validation: {
          required: true,
          pattern: "[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+",
        },
      },
    ],
    null,
    2
  );

  const [formConfig, setFormConfig] = useState(initialFormConfig);
  const [validationMessages, setValidationMessages] = useState({});
  const [selectedValues, setSelectedValues] = useState({});

  const handleJSONChange = (newValue) => {
    setFormConfig(newValue); // Store the JSON string for the AceEditor value
    try {
      const parsedJSON = JSON.parse(newValue);
      // Use another state or a way to pass this parsedJSON to renderForm
      // If using a separate state, ensure it's updated here
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  };
  const handleRadioChange = (e, fieldName) => {
    setSelectedValues({ ...selectedValues, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedConfig = JSON.parse(formConfig);
    // Example validation logic
    parsedConfig.forEach((field) => {
      // Apply validation based on field.validation rules
    });
    // Submit form if valid
  };

  const renderForm = (jsonConfig) => {
    const validateFile = (event, allowedFileTypes) => {
      const file = event.target.files[0];
      let message = "";
      const fileType = "." + file.name.split(".").pop(); // Extract file extension

      if (
        file &&
        allowedFileTypes.length > 0 &&
        !allowedFileTypes.includes(fileType)
      ) {
        message = `Allowed file types: ${allowedFileTypes.join(", ")}`;
      }
      setValidationMessages({
        ...validationMessages,
        [event.target.name]: message,
      });
    };
    let config;
    try {
      config = JSON.parse(jsonConfig);
    } catch (error) {
      return <p>Invalid JSON configuration.</p>; // Handle parsing errors
    }
    if (!Array.isArray(config)) {
      return (
        <p>
          Form configuration is not valid. Please provide an array of field
          configurations.
        </p>
      );
    }

    // Map over the configuration to render form fields
    return config.map((field, index) => {
      if (
        field.condition &&
        selectedValues[field.condition.field] !== field.condition.equals
      ) {
        return null;
      }
      switch (field.type) {
        case "radio":
          return (
            <div key={index}>
              <label>{field.label}</label>
              {field.options.map((option, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    onChange={(e) => handleRadioChange(e, field.name)}
                  />{" "}
                  {option.label}
                </label>
              ))}
            </div>
          );
        case "file":
          return (
            <div key={index}>
              <label>{field.label}</label>
              <input
                type="file"
                name={field.name}
                onChange={(e) => validateFile(e, field.validation.fileTypes)} // Pass allowed file types for validation
              />
              {validationMessages[field.name] && (
                <p style={{ color: "red" }}>{validationMessages[field.name]}</p>
              )}
            </div>
          );

        case "textarea":
          return (
            <div key={index}>
              <label>{field.label}</label>
              <textarea
                name={field.name}
                placeholder={field.placeholder}
              ></textarea>
            </div>
          );
        case "checkbox":
          return (
            <div key={index}>
              <label>
                <input type="checkbox" name={field.name} /> {field.label}
              </label>
            </div>
          );
        case "radio":
          return (
            <div key={index}>
              <label>{field.label}</label>
              {field.options.map((option, i) => (
                <label key={i}>
                  <input type="radio" name={field.name} value={option.value} />{" "}
                  {option.label}
                </label>
              ))}
            </div>
          );
        case "text":
        case "email":
          return (
            <div key={index}>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
              />
            </div>
          );
        case "select":
          // Ensure options is defined and is an array before mapping over it
          if (field.options && Array.isArray(field.options)) {
            return (
              <div key={index}>
                <label>{field.label}</label>
                <select name={field.name}>
                  {field.options.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else {
            return (
              <p key={index}>
                Error: Options for select field "{field.name}" are not properly
                defined.
              </p>
            );
          }
        default:
          return null; // Handle unsupported field types
      }
    });
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          flex: 1,
          overflow: "auto",
          border: "1px solid black",
        }}
      >
        <AceEditor
          mode="json"
          theme="github"
          onChange={handleJSONChange}
          name="formJsonEditor"
          editorProps={{ $blockScrolling: true }}
          value={formConfig}
          setOptions={{ useWorker: false }}
        />
      </div>
      <div style={{ flex: 1, overflow: "auto", border: "1px solid red" }}>
        {/* Ensure renderForm is called with the state that contains the JSON string */}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {renderForm(formConfig)}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
