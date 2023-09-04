// import { useState } from "react";
// import { dateGenerator } from "../../utils/dategenerator";
// import { uidGenerator } from "../../utils/uidgenerator";
// import { addBlogInDatabase, uploadMedia } from "../../firebase/firebase";
// import "./createblog.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const CreateBlog = () => {
//   const [author, setAuthor] = useState("");
//   const [title, setTitle] = useState("");
//   const [imgFile, setImgFile] = useState(null);
//   const [textContent, setTextContent] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const onAddPostHandler = async () => {
//     setIsLoading(true);
//     const img = await uploadMedia(imgFile);
//     let uid = uidGenerator();
//     let publishedOn = dateGenerator();

//     const blogData = {
//       author: author,
//       heading: title,
//       body: textContent,
//       image: { imageName: imgFile.name, imageUrl: img },
//       publishedOn: publishedOn,
//       id: uid,
//     };
//     await addBlogInDatabase(uid, blogData);
//     setIsLoading(false);
//     setAuthor("");
//     setTitle("");
//     setTextContent("");
//     toast.success("Post Added Successfully !", { position: "bottom-left" });
//   };
//   return (
//     <>
//       <div className="Main_CreateBlog_Container">
//         <div className="Blog_Form">
//           <input
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             placeholder="author"
//           />
//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="title"
//           />

//           <input
//             type="file"
//             onChange={(e) => {
//               if (e.target.files[0]) {
//                 setImgFile(e.target.files[0]);
//               }
//             }}
//           />

//           <button
//             onClick={async () => {
//               if (author && title && textContent) {
//                 onAddPostHandler();
//               } else {
//                 toast.error("Fields can't be empty !", {
//                   position: "bottom-left",
//                 });
//               }
//             }}
//           >
//             {isLoading ? "Uploading..." : " Add Post"}
//           </button>
//         </div>
//         <div className="Blog_TextContent">
//           <textarea
//             value={textContent}
//             onChange={(e) => setTextContent(e.target.value)}
//             placeholder="Do not think ! Just write it "
//             rows="18"
//           />
//         </div>
//       </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default CreateBlog;



import { useState } from "react";
import { dateGenerator } from "../../utils/dategenerator";
import { uidGenerator } from "../../utils/uidgenerator";
import { addBlogInDatabase, uploadMedia } from "../../firebase/firebase";
import styles from "./createblog.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "quill-image-uploader/dist/quill.imageUploader.min.css";

Quill.register("modules/imageUploader", ImageUploader);
Quill.register("modules/imageResize", ImageResize);

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote"],
      // ["blockquote", "code-block"],
      [{ image: "customImageHandler" }],
      ["video", "link"],
      [{ color: [] }, { background: [] }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["clean"],
    ],
  },
  imageUploader: {
    upload: async (file) => {
      try {
        const imgUrl = await uploadMedia(file);
        return imgUrl;
      } catch (error) {
        // Handle any errors that occur during the upload.
        console.error("Error uploading image:", error);
        throw error; // Rethrow the error to reject the promise
      }
    },
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
};

const CreateBlog = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");

  const onAddPostHandler = async () => {
    setIsLoading(true);
    let uid = uidGenerator();
    let publishedOn = dateGenerator();

    const blogData = {
      author: author,
      heading: title,
      body: value,
      publishedOn: publishedOn,
      id: uid,
    };
    await addBlogInDatabase(uid, blogData);
    setIsLoading(false);
    setAuthor("");
    setTitle("");
    setValue("");
    toast.success("Post Added Successfully !", { position: "bottom-left" });
  };

  return (
    <>
      <div className={styles.Main_CreateBlog_Container}>
        <div className={styles.Blog_Form}>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="author"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
          <button
            onClick={async () => {
              if (author && title && value) {
                onAddPostHandler();
              } else {
                toast.error("Fields can't be empty !", {
                  position: "bottom-left",
                });
              }
            }}
          >
            {isLoading ? "Uploading..." : " Add Post"}
          </button>
        </div>

        <ReactQuill
          className={styles.editor}
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
        />
        {/* <ReactQuill
          className={styles.preview}
          value={value}
          readOnly={true}
          theme={"bubble"}
        /> */}
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateBlog;
