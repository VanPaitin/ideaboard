import React, { useState } from 'react';

export default ({ idea, submitData, deleteIdea }) => {
  let [title, setTitle] = useState(idea.title);
  let [body, setBody] = useState(idea.body);

  let handleBlur = e => {
    let target = e.target;
    let attribute = e.target.getAttribute('data-name');
    let innerText = idea[attribute];

    let errorCallback = () => {
      target.innerText = innerText
    };

    submitData({ title, body, id: idea.id }, errorCallback);
  };

  let handleDelete = () => {
    if (window.confirm('Are you sure you want to delete the idea?')) {
      deleteIdea(idea.id)
    }
  };

  return  (
    <div className='tile'>
      <span className='deleteButton' onClick={handleDelete}>X</span>
      <h4
        contentEditable={true} onBlur={handleBlur}
        suppressContentEditableWarning={true} data-name='title'
        onInput={e => setTitle(e.target.innerText)}>{idea.title}</h4>
      <p
        contentEditable={true} onBlur={handleBlur}
        suppressContentEditableWarning={true} data-name='body'
        onInput={e => setBody(e.target.innerText)}>{idea.body}</p>
    </div>
  )
}
