import React, { Component } from "react";
import "./App.css";
import { Modal, Button } from "react-bootstrap";
class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      value: "",
      showDesc: false,
      cardsList: [],
      description: "",
      currentCard: {
        description: ""
      }
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleHideDesc = this.handleHideDesc.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addDesc = this.addDesc.bind(this);
    this.clearStorgae = this.clearStorgae.bind(this);

    //sretrieving exisitng cards
    const existingCards = localStorage.getItem("cards");

    if (typeof existingCards == "string" && existingCards.length) {
      this.state.cardsList = JSON.parse(existingCards);
      const $ = window.jQuery;
      setTimeout(() => {
        $(".move").show();
        $(".move-left:first").hide();
        $(".move-right:last").hide();
      });
    }
  }

  handleShow() {
    this.setState({
      show: true
    });
  }

  handleHideDesc() {
    this.setState({
      showDesc: false
    });
  }

  handleHide() {
    this.setState({
      show: false
    });
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleDescChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleSubmit(event) {
    this.state.cardsList.push({
      title: this.state.value,
      description: "",
      id: "card-" + new Date().getTime()
    });
    event.preventDefault();
    this.setState({
      show: false
    });
    this.state.value = "";
    localStorage.setItem("cards", JSON.stringify(this.state.cardsList));
    const $ = window.jQuery;
    setTimeout(() => {
      $(".move").show();
      $(".move-left:first").hide();
      $(".move-right:last").hide();
    });
  }

  handleDesc(cardId) {
    this.setState({
      showDesc: true
    });
    this.state.description = "";
    for (let i = 0; i < this.state.cardsList.length; i++) {
      if (this.state.cardsList[i].id == cardId) {
        this.state.description = this.state.cardsList[i].description;
        this.state.currentCard = this.state.cardsList[i];
        break;
      }
    }
  }

  moveLeft(event) {
    const $ = window.jQuery;
    $(event.currentTarget)
      .parents(".ui-state-default")
      .insertBefore(
        $(event.currentTarget)
          .parents(".ui-state-default")
          .prev()
      );
    $(".move").show();
    $(".move-left:first").hide();
    $(".move-right:last").hide();
  }

  moveRight(event) {
    const $ = window.jQuery;
    $(event.currentTarget)
      .parents(".ui-state-default")
      .insertAfter(
        $(event.currentTarget)
          .parents(".ui-state-default")
          .next()
      );
    $(".move").show();
    $(".move-left:first").hide();
    $(".move-right:last").hide();
  }

  addDesc(event) {
    event.preventDefault();
    if (this.state.description) {
      for (let i = 0; i < this.state.cardsList.length; i++) {
        if (this.state.cardsList[i].id == this.state.currentCard.id) {
          this.state.cardsList[i].description = this.state.description;
          break;
        }
      }
      this.setState({
        showDesc: false
      });
    }
  }

  clearStorgae() {
    localStorage.setItem("cards", "");
  }

  render() {
    const AddColumnButton = props => {
      if (this.state.cardsList.length <= 4) {
        return (
          <button onClick={this.handleShow} className="btn btn-sm btn-primary">
            {" "}
            Add Column{" "}
          </button>
        );
      } else {
        return <div> </div>;
      }
    };

    const MoveLeftButton = props => {
      return (
        <span
          onClick={this.moveLeft.bind(this)}
          className="glyphicon glyphicon-chevron-left  move move-left"
        >
          {" "}
        </span>
      );
    };

    const MoveRightButton = props => {
      return (
        <span
          className="glyphicon glyphicon-chevron-right move move-right"
          onClick={this.moveRight.bind(this)}
        >
          {" "}
        </span>
      );
    };

    return (
      <div className="App">
        <div className="col-md-12 col-lg-12 text-right">
          <AddColumnButton> </AddColumnButton>{" "}
          <button
            onClick={this.clearStorgae}
            className="btn btn-sm btn-primary claer-btn"
          >
            {" "}
            Clear Storage{" "}
          </button>{" "}
        </div>{" "}
        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.handleHide}
          backdrop="static"
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Add Column </Modal.Title>{" "}
          </Modal.Header>{" "}
          <Modal.Body>
            {" "}
            <form onSubmit={this.handleSubmit} className="form-horizontal">
              {" "}
              <div className="form-group">
                {" "}
                <label className="col-md-3 col-lg-3">
                  {" "}
                  Column Title:{" "}
                </label>{" "}
                <div className="col-md-6 col-lg-6">
                  {" "}
                  <input
                    type="text"
                    className="form-control input-sm"
                    placeholder="Title Name"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />{" "}
                </div>
              </div>{" "}
              <div className="form-group form-buttons pull-right">
                {" "}
                <input
                  type="submit"
                  value="Create"
                  required
                  className="btn btn-sm btn-primary"
                />{" "}
                <Button
                  onClick={this.handleHide}
                  className="btn btn-sm btn-default"
                >
                  {" "}
                  Close{" "}
                </Button>{" "}
              </div>{" "}
            </form>
          </Modal.Body>
        </Modal>{" "}
        <div className="row" id="sortable">
          {" "}
          {this.state.cardsList.map((card, index) => (
            <div className="col-sm-6 col-md-4 ui-state-default" key="{card.id}">
              <MoveLeftButton noOfColumns={index}> </MoveLeftButton>{" "}
              <MoveRightButton noOfColumns={index}> </MoveRightButton>{" "}
              <div className="thumbnail">
                <h3> {card.title} </h3> <p> {card.description} </p>{" "}
                <p>
                  {" "}
                  <button
                    onClick={this.handleDesc.bind(this, card.id)}
                    className="btn btn-primary btn-sm"
                  >
                    {" "}
                    {card.description.length > 0 ? "Update" : "Add"}
                    Description{" "}
                  </button>
                </p>
              </div>{" "}
            </div>
          ))}{" "}
        </div>
        <div className="descModal">
          <Modal
            {...this.props}
            show={this.state.showDesc}
            onHide={this.handleHideDesc}
            backdrop="static"
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">
                {" "}
                {this.state.currentCard.description.length > 0
                  ? "Update"
                  : "Add"}
                Description for {this.state.currentCard.title}{" "}
              </Modal.Title>{" "}
            </Modal.Header>{" "}
            <Modal.Body>
              {" "}
              <form onSubmit={this.addDesc} className="form-horizontal">
                {" "}
                <div className="form-group">
                  {" "}
                  <label className="col-md-3 col-lg-3">
                    {" "}
                    Description:{" "}
                  </label>{" "}
                  <div className="col-md-6 col-lg-6">
                    {" "}
                    <input
                      type="text"
                      className="form-control input-sm"
                      placeholder="Description"
                      value={this.state.description}
                      onChange={this.handleDescChange}
                    />{" "}
                  </div>
                </div>{" "}
                <div className="form-group form-buttons pull-right">
                  {" "}
                  <input
                    type="submit"
                    value="Create"
                    required
                    className="btn btn-sm btn-primary"
                  />{" "}
                  <Button
                    onClick={this.handleHideDesc}
                    className="btn btn-sm btn-default"
                  >
                    {" "}
                    Close{" "}
                  </Button>{" "}
                </div>{" "}
              </form>
            </Modal.Body>
          </Modal>{" "}
        </div>
      </div>
    );
  }
}

export default App;
