import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import NewIdeaForm from './NewIdeaForm';
import Idea from './Idea';
import Notification from './Notification';

export default class IdeasContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ideas: [],
      showModal: false,
      errors: null,
      notification: '',
      transitionIn: false
    }
  }

  componentDidMount() {
    axios.get(`${window.API_DOMAIN}/api/ideas`)
      .then(response => this.setState({ ideas: response.data }))
      .catch(error => console.error(error));
  }

  renderIdeaForm = () => this.setState({ showModal: true });

  closeIdeaForm = () => this.setState({ showModal: false, errors: null });

  createIdea = (data) => {
    axios.post(`${window.API_DOMAIN}/api/ideas`, { idea: data })
      .then(({ data }) => {
        document.querySelector('.modal-header button.close').click();
        this.setState({
          ideas: [data].concat(this.state.ideas), errors: null,
          notification: 'Idea successfully created', transitionIn: true
        });
        let timeout = setTimeout(() => {
          this.setState({ notification: '', transitionIn: false });
          clearTimeout(timeout);
        }, 2000)
      })
      .catch(({ response }) => {
        let { data } = response;
        this.setState({ errors: data })
      });
  };

  updateIdea = ({ id, ...data }, eb) => {
    axios.put(`${window.API_DOMAIN}/api/ideas/${id}`, { idea: data })
      .then(() => {
        this.setState({  notification: 'All changes saved', transitionIn: true });
        let timeout = setTimeout(() => {
          this.setState({ notification: '', transitionIn: false });
          clearTimeout(timeout);
        }, 2000)
      })
      .catch(() => {
        this.setState({
          notification: 'An error occurred, check your network or fill all inputs!',
          errors: true, transitionIn: true
        });
        let timeout = setTimeout(() => {
          this.setState({ notification: '', errors: null, transitionIn: false });
          clearTimeout(timeout);
        }, 2000);
        eb();
      });
  };

  deleteIdea = (id) => {
    axios.delete(`${window.API_DOMAIN}/api/ideas/${id}`)
      .then(() => {
        this.setState({ ideas: this.state.ideas.filter(idea => idea.id !== id)});
      });
  };

  cancelModal = () => document.querySelector('.modal-header button.close').click();

  transferClick = e => {
    e.preventDefault();
    document.querySelector('button.dummy-button').click();
  };

  render() {
    return (
      <div>
        <div>
          <button className='newIdeaButton' onClick={this.renderIdeaForm}>New
            Idea
          </button>
          <Notification notification={this.state.notification} in={this.state.transitionIn} error={this.state.errors}/>
        </div>
        {this.state.ideas.map(idea => (
          <Idea idea={idea} key={idea.id} submitData={this.updateIdea} deleteIdea={this.deleteIdea} />
        ))}
        <Modal show={this.state.showModal} onHide={this.closeIdeaForm} centered>
          <Modal.Header closeButton>
            <Modal.Title>New Idea</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewIdeaForm submitData={this.createIdea}
                         errors={this.state.errors}/>
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
