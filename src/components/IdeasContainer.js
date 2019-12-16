import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import NewIdeaForm from './NewIdeaForm';
import Idea from './Idea';

export default class IdeasContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ideas: [],
      showModal: false,
      errors: null,
      notification: ''
    }
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/ideas`)
      .then(response => this.setState({ ideas: response.data }))
      .catch(error => console.error(error));
  }

  renderIdeaForm = () => this.setState({ showModal: true });

  closeIdeaForm = () => this.setState({ showModal: false, errors: null });

  createIdea = (data) => {
    axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/ideas`, { idea: data })
      .then(({ data }) => {
        document.querySelector('.modal-header button.close').click();
        this.setState({ ideas: [data].concat(this.state.ideas), errors: null })
      })
      .catch(({ response }) => {
        let { data } = response;
        this.setState({ errors: data })
      });
  };

  updateIdea = ({ id, ...data }, eb) => {
    axios.put(`${process.env.REACT_APP_API_DOMAIN}/api/ideas/${id}`, { idea: data })
      .then(() => {
        this.setState({  notification: 'All changes saved' });
        let timeout = setTimeout(() => {
          this.setState({ notification: '' });
          clearTimeout(timeout);
        }, 2000)
      })
      .catch(() => {
        alert('An error occurred, check your network or fill all inputs!');
        eb();
      });
  };

  cancelModal = () => document.querySelector('.modal-header button.close').click();

  transferClick = e => {
    e.preventDefault();
    document.querySelector('button.dummy-button').click();
  };

  deleteIdea = (id) => {
    axios.delete(`${process.env.REACT_APP_API_DOMAIN}/api/ideas/${id}`)
      .then(() => {
        this.setState({ ideas: this.state.ideas.filter(idea => idea.id !== id)});
      });
  };

  render() {
    return (
      <div>
        <div>
          <button className='newIdeaButton' onClick={this.renderIdeaForm}>New Idea</button>
          <span className="notification">
            {this.state.notification}
          </span>
        </div>
        {this.state.ideas.map(idea => (
          <Idea idea={idea} key={idea.id} submitData={this.updateIdea} deleteIdea={this.deleteIdea} />
        ))}
        <Modal show={this.state.showModal} onHide={this.closeIdeaForm} centered>
          <Modal.Header closeButton>
            <Modal.Title>New Idea</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewIdeaForm submitData={this.createIdea} errors={this.state.errors}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.cancelModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={this.transferClick}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
