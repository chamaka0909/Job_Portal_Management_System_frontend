import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import AdminNavBar from "../admin/AdminNavBar";
import RightSidePanel from "../admin/slideBar";

export default function ReplyToUser() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [title, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/inquiries/get/${id}`).then((res) => {
      setName(res.data.exsitingInquiries.name);
      setType(res.data.exsitingInquiries.type);
      setSubject(res.data.exsitingInquiries.title);
      setMsg(res.data.exsitingInquiries.msg);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      type: type,
      title: title,
      msg: msg,
      reply: reply,
    };

    axios
      .put(`http://localhost:5000/inquiries/update/${id}`, data)
      .then((res) => {
        if (res.data.success) {
          swal("Reply successfully!", "", "success").then((value) => {
            if (value) {
              window.location = "/admin/inquiries";
            }
          });
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
          <h4>Reply</h4>

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
                  disabled
                />
              </div>

              <div className="form-group" style={{ marginBottom: "15px" }}>
                {" "}
                <label for="title" style={{ marginBottom: "1px" }}>
                  Title
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled
                />
              </div>

              <div className="form-group" style={{ marginBottom: "15px" }}>
                {" "}
                <label for="msg" style={{ marginBottom: "1px" }}>
                  Message
                </label>
                <textarea
                  class="form-control"
                  id="msg"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  disabled
                />
              </div>

              <div className="form-group" style={{ marginBottom: "15px" }}>
                {" "}
                <label for="reply" style={{ marginBottom: "1px" }}>
                  Reply
                </label>
                <textarea
                  class="form-control"
                  id="reply"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
              </div>

              <button
                type="submit"
                onClick={onSubmit}
                class="btn btn-outline-primary"
              >
                Reply
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
