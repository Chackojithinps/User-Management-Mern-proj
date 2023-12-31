import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
import axios from "axios";

function Profile() {
  const [userData,setUserdata] = useState({})
  const [image,setImage] = useState("")
  const [url,setUrl] = useState(true)
  useEffect(() => {
    axios
      .get("http://localhost:5000/profile", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log("profile: ", res.data);
        console.log("userData : ", res.data.UserDetails)
        setUserdata(res.data.UserDetails)
      });
  }, [url]);
  // console.log("userData1 : ", userData)

  const onInputChange=(e)=>{
    console.log(e.target.files[0])
    setImage(e.target.files[0])
  }
  
  const handleUpload =async (e)=>{
     e.preventDefault();

     const formData = new FormData();
     formData.append("image",image)

     const res = await axios.post("http://localhost:5000/profile-image",formData,{
        headers:{"Content-Type":"multipart/form-data"},
     
      withCredentials:true
     }).then((res)=>{
      console.log("res.dattta:",res.data)
        setUrl(res.data.url)
     })
  }
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={url?`/Backend/public/profileImages/Screenshot 2023-07-01 113537.png`:"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                {/* <p className="text-muted mb-1">{userData.fname}</p> */}
                <p className="text-muted mb-4">{userData.fname}</p>
                <div className="d-flex justify-content-center mb-2">
                <form action="/profile" method="post" enctype="multipart/form-data">
                  <input type="file" accept="image/*" name="avatar" onChange={onInputChange}/>
                  <MDBBtn onClick={handleUpload}>Upload Photo</MDBBtn>
                </form>
                  
                  {/* <MDBBtn outline className="ms-1">
                    Message
                  </MDBBtn> */}
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                        {userData.fname} {userData.lname}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                       {userData.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      (097) 234-5678
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      (098) 765-4321
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                    {userData.fname} {userData.lname} , {userData.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default Profile;
