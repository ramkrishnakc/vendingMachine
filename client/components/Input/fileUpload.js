import PropType from 'prop-types';
import React, {useState} from 'react';
import FontAwesomeIcon from '../FontAwesomeLibrary';

// Handle file upload
const handleFiles = (
  inputObject,
  maxFiles,
  maxSize,
  allowedExtensions,
  fileHandler,
  setFileName
) => {
  const {files} = inputObject || {};
  const len = files && files.length;

  if (len && len <= maxFiles) {
    let filename = '';
    let errMessage = '';
    let idx = 0;

    do {
      const file = files[idx];
      const ext = file.name.split('.').pop();
      const size = (file.size / (1024 * 1024)).toFixed(4);

      if (size > maxSize) {
        idx += len;
        errMessage = `${file.name} size exceeds ${maxSize}mb`;
      } else if (!allowedExtensions.includes(`.${ext}`)) {
        idx += len;
        errMessage = `Only ${allowedExtensions.join(',')} files are allowed`;
      } else {
        idx += 1;
        filename = filename ? `${filename}, ${file.name}` : file.name;
      }
    } while (idx < len);

    if (!errMessage) {
      fileHandler(files);
      setFileName(filename);
      return null;
    }
    // Display the error message
    return errMessage;
  }
  return `Only ${maxFiles} file is allowed`;
};

const NativeUpload = (props) => {
  const [fileName, setFileName] = useState(undefined);
  const [draggedUpon, setDraggedUpon] = useState(false);
  const activeClass = draggedUpon ? 'native-upload-active' : '';

  return (
    <div className={`native-upload ${activeClass}`}>
      <input
        type="file"
        id="fileElem"
        accept={props.allowedExtensions.join(', ')}
        className="hidden"
        onChange={(event) =>
          handleFiles(
            event.target,
            props.maxFiles,
            props.maxSize,
            props.allowedExtensions,
            props.fileHandler,
            setFileName
          )
        }
        multiple={props.maxFiles > 1}
      />
      <label
        htmlFor="fileElem"
        onDrop={(event) => {
          setDraggedUpon(false);
          event.stopPropagation();
          event.preventDefault();
          const {dataTransfer} = event;
          if (dataTransfer) {
            handleFiles(
              dataTransfer,
              props.maxFiles,
              props.maxSize,
              props.allowedExtensions,
              props.fileHandler,
              setFileName
            );
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setDraggedUpon(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDraggedUpon(true);
        }}
        onDragLeave={() => {
          setDraggedUpon(false);
        }}
      >
        <div
          className="flex vertical-align-center horizontal-align-center flex-row"
          style={{paddingTop: 5}}
        >
          <div style={{marginRight: 10}}>
            <FontAwesomeIcon
              icon={props.icon}
              style={{fontSize: '23px', color: 'gray'}}
            />
          </div>
          {!fileName && <div>{props.label}</div>}
          {fileName && <div>{fileName}</div>}
        </div>
      </label>
    </div>
  );
};

NativeUpload.defaultProps = {
  label: 'Upload',
  allowedExtensions: ['.png', '.jpg', '.jpeg'],
  icon: 'file-image',
  maxFiles: 1,
  maxSize: 2000,
};
NativeUpload.propTypes = {
  label: PropType.string,
  fileHandler: PropType.func.isRequired,
  icon: PropType.string,
  maxSize: PropType.number,
  maxFiles: PropType.number,
  allowedExtensions: PropType.arrayOf(PropType.string),
};

export default NativeUpload;
