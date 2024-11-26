import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, PasteSlice, updateToPaste } from './redux/PasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams('');
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  function createPaste() {
    const paste = {
      title: title,
      content: value,
      id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString
        (),
    }
    if (pasteId) {
      // update
      // eslint-disable-next-line no-undef
      dispatch(updateToPaste(paste));
    }
    else {
      // create and provide the value
      // eslint-disable-next-line no-undef
      dispatch(addToPaste(paste));
    }
    // after creation and updation
    setTitle('');
    setValue('');
    setSearchParams({});



  }
  return (
    //trace the title
    <div className='home-div'>
      <input
        className="input-field"
        type="text"
        placeholder='enter the title here'
        value={title}
        onChange={(e) => setTitle(e.target.value)} />
      {/* call the create  */}
      <button className='create-btn'
        onClick={createPaste}>
        {
          pasteId ? "Update My Paste" : "Create My Paste"
        }
      </button>
      {/*  trace the value */}
      <div >
        <textarea
          className='text-area'
          value={value}
          placeholder='enter content here'
          onChange={(e) => setValue(e.target.value)}
          rows={10}
        />
      </div>
    </div>
  )
}

export default Home
