import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import { IoMdDownload } from "react-icons/io";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import Loader from "./loader";
import BackToTop from "react-back-to-top-button";
import Navbar from "./navbar";
import { useStateValue } from "./stateprovider";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();

  const [photoUrl, setPhotoUrl] = useState([]);
  const [viewImage, setViewimage] = useState("");
  const [viewHeight, setViewheight] = useState(0);
  const [Search, setSearch] = useState("all");
  const [searchphotos, setsearchphotos] = useState(50);
  const [{ islogin, images }, dispatch] = useStateValue();
  const [isLoading, setisLoading] = useState(false);
  const [url] = useState(
    "https://pixabay.com/api/?key=20836465-18774b5c4c5edd16df2ee5902"
  );

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const getNewphotos = async () => {
    setisLoading(true);
    setsearchphotos(parseInt(searchphotos) + 50);
    await axios
      .get(`${url}&q=${Search}&per_page=${searchphotos + 50}`)
      .then((response) => {
        setPhotoUrl(response.data.hits);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(function () {
      setisLoading(false);
    }, 1000);
  };

  const serchByQuery = async (searchItem) => {
    setisLoading(true);
    setSearch(searchItem);
    await axios
      .get(`${url}&q=${searchItem}&per_page=${searchphotos}`)
      .then((response) => {
        setPhotoUrl(response.data.hits);
        dispatch({
          type: "ADD_IMAGES",
          item: {
            photos: response.data.hits,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(function () {
      setisLoading(false);
    }, 1000);
  };

  const getPhotos = () => {
    setisLoading(true);
    axios
      .get(`${url}&per_page=${searchphotos}`)
      .then((response) => {
        setPhotoUrl(response.data.hits);
        dispatch({
          type: "ADD_IMAGES",
          item: {
            photos: response.data.hits,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(function () {
      setisLoading(false);
    }, 1000);
  };

  const downloadImage = (imgUrl) => {
    if (islogin) {
      const filename = imgUrl.substr(imgUrl.lastIndexOf("/") + 1);
      saveAs(imgUrl, filename);
    } else {
      setShow(true);
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <>
      <Navbar serchBycategories={serchByQuery} />
      <div className="container-fluid w-100 pt-5">
        <div
          className="container-fluid d-flex viewimage justify-content-center align-items-center"
          style={{ height: `${viewHeight}%` }}
        >
          <img src={viewImage} className="img-fluid" />
        </div>
        <div className=" mt-5 h2 text-center"> You search for : {Search} </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="container">
              {photoUrl.length === 0 ? (
                <div className="text-center h1 mt-5">
                  Ooops, Sorry 😞 <br />
                  Result Not Found
                </div>
              ) : (
                <div className="row">
                  <div className="col-lg-6 col-md-12 p-1">
                    {photoUrl
                      .slice(0, Math.round(photoUrl.length / 2))
                      .map((url, index) => (
                        <div className="mt-2" key={index}>
                          <div className="image-setting">
                            <img
                              src={url.webformatURL}
                              className="w-100"
                              alt="something went wrong"
                            />
                            <div className="image-nav-wrap w-100 ">
                              <div className="user-wrap">
                                <img
                                  src={url.userImageURL}
                                  className="rounded-circle userImage "
                                />
                                <span className="ms-2 userName d-flex justify-content-center align-items-center">
                                  {url.user}
                                </span>
                              </div>
                              <div className="button-wrap ">
                                <span className=" p-2 img-button text-center d-flex justify-content-center align-items-center rounded-circle h3">
                                  <IoMdDownload
                                    onClick={() =>
                                      downloadImage(url.largeImageURL)
                                    }
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="col-lg-6 col-md-12 h-100 p-1">
                    {photoUrl
                      .slice(Math.round(photoUrl.length / 2), photoUrl.length)
                      .map((url, index) => (
                        <div className="mt-2" key={index}>
                          <div className="image-setting">
                            <img
                              src={url.webformatURL}
                              className="w-100"
                              alt="something went wrong"
                            />
                            <div className="image-nav-wrap w-100">
                              <div className="user-wrap">
                                <img
                                  src={url.userImageURL}
                                  className="rounded-circle userImage "
                                />
                                <span className="ms-2 userName d-flex justify-content-center align-items-center">
                                  {url.user}
                                </span>
                              </div>
                              <div className="button-wrap">
                                <span className=" p-2 img-button text-center d-flex justify-content-center align-items-center rounded-circle h3">
                                  <IoMdDownload
                                    onClick={() =>
                                      downloadImage(url.largeImageURL)
                                    }
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              <div
                className="d-flex justify-content-center align-items-center m-5"
                onClick={() => getNewphotos()}
              >
                {photoUrl.length === 50 && (
                  <button className="btn btn-outline-primary">Load more</button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <BackToTop showAt={200} speed={1500} easing="easeInOutQuint">
        <div className="rounded bg-dark p-2">
          <FaRegArrowAltCircleUp className="h1 text-light d-flex justify-content-center align-items-center" />
        </div>
      </BackToTop>
      <Modal show={show} onhide>
        <Modal.Body>
          Sorry , but if you want to download photos please login
        </Modal.Body>
        <Modal.Footer className="p-1">
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => history.push("login")}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
