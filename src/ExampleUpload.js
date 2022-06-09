import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ImageUploader() {
  const [postImage, setPostImage] = useState({
    myFile: "",
  });
  const [image, setImage] = useState()

  const url = "http://localhost:3000/profile/1";
  const createImage = (newImage) => axios.patch(url, {
    profile_picture: newImage
  }).then((res) => { })

  const createPost = async (post) => {
    try {
      await createImage(post);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  useEffect(() => {
    axios.get("http://localhost:3000/profile/1").then((res) => {
      console.log()
      setImage(res.data.profile_picture.myFile)
    })
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          label="Image"
          name="myFile"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />
        <img src={image} />

        <button>Submit</button>
      </form>
    </div>
  );
}