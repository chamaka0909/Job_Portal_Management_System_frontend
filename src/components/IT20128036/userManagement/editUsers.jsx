import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import AdminNavBar from "../admin/AdminNavBar";
import RightSidePanel from "../admin/slideBar";

export default function EditUsers() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [field, setField] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/user/${id}`).then((res) => {
      setName(res.data.user.name);
      setEmail(res.data.user.email);
      setMobile(res.data.user.mobile);
      setField(res.data.user.field);
      setAddress(res.data.user.address);
      setType(res.data.user.type);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      mobile: mobile,
      field: field,
      address: address,
      type: type,
    };

    axios.put(`http://localhost:5000/user/update/${id}`, data).then((res) => {
      if (res.data.success) {
        swal("User details updated successfully!", "", "success").then(
          (value) => {
            if (value) {
              window.location = "/admin/userroles";
            }
          }
        );
      }
    });
  };

  return (
    <div className="container">
      <br />
      <AdminNavBar />
      <br />
      <div className="row" style={{ marginLeft: "1px" }}>
        {/* <div className="col-sm-3">
          <RightSidePanel />
        </div> */}

        <div className="col-sm-3" style={{ backgroundColor: "#DCDCDC" }}>
          <br />
          <RightSidePanel />
        </div>

        <div className="col-md-8 mt-4 mx-auto">
          <h4>Edit User</h4>

          <div className="col-sm-9">
            <form>
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label for="name" style={{ marginBottom: "1px" }}>
                  Name
                </label>{" "}
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "15px" }}>
                {" "}
                <label for="email" style={{ marginBottom: "1px" }}>
                  Email
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    {" "}
                    <label for="mobile" style={{ marginBottom: "1px" }}>
                      Mobile
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    {" "}
                    <label for="field" style={{ marginBottom: "1px" }}>
                      Field
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="field"
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "15px" }}>
                {" "}
                <label for="address" style={{ marginBottom: "1px" }}>
                  Address
                </label>
                <textarea
                  class="form-control"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "15px" }}>
                {" "}
                <label for="type" style={{ marginBottom: "1px" }}>
                  Type
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>

              <button
                type="submit"
                onClick={onSubmit}
                class="btn btn-outline-primary"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
