import React, { useState } from "react";

function App() {
    const [image, setImage] = useState(null);

    const submitImage = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);

        // Now you can proceed with sending formData to your server
    
//     const result = await axios.post("http://localhost:8000/uploadImage",
//     formData,
//     {
//         hedaers:{"content-type":"multipart/form-data"},
//     }
//    );
};
    const onInputChange = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    };

    return (
        <div>
            <form onSubmit={submitImage}>
                <input type="file" accept="image/*" onChange={onInputChange}></input>
                <button type="submit">Submit</button>
                <button type="submit">Submit</button>
                <button type="submit">Submit</button>
                <button type="submit">Submit</button>
                <button type="submit">Submit</button>
                
            </form>
        </div>
    );
}

export default App;
