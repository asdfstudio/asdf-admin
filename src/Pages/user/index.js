import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ActionButton from "@aio/components/ActionButton";
import HeaderSection from "@aio/components/HeaderSection";
import Modal from "@aio/components/Modal";
import Spinner from '@aio/components/Spinner';
import { useDispatch } from 'react-redux';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import UserHistory from 'src/components/userHistory';


const User = () => {
  const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const users = useSelector(state => state.user);
    const filteredUsers = users.users.filter(user => user.id !== auth.user.id);
    const userRoleUsers = filteredUsers.filter(user => user.role === 'user');
    const adminRoleUsers = filteredUsers.filter(user => ['admin', 'superAdmin'].includes(user.role));
    const [modal, setModal] = useState(false);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [coverImage, setCoverImage] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const handleClose = () => {
      setModal(false);
      setTitle(title);
      setDesc(desc);
      setCoverImage([]);
    };

    const handleCloseAfterSubmit = () => {
      setModal(false);
      setTitle('');
      setDesc('');
      setEditorState('');
      setCoverImage([]);
    };

    const handleShowAlert = () => {
      setShowAlert(true);
    };
  
    const handleCloseAlert = () => {
      setShowAlert(false);
    };

    const handleSubmit = (e) => {

    };
    
    return (
      users.loading ? 
        <Spinner/> : 
        users.loading ? <Spinner /> : 
        <>
        <section>
          <HeaderSection
              heading={"Admin"}
              subHeading={"Super Admin & Admin list"}
          />
          <UserHistory
            data={adminRoleUsers} 
          />
        </section>

        <section>
          <HeaderSection
              heading={"User"}
              subHeading={"User's application list"}
              rightItem={() => (
                <ActionButton
                    onClick={() => setModal(true)}
                    Icon={AiOutlinePlusCircle}
                    label="User"
                />
              )}
          />
          <UserHistory
            data={userRoleUsers} 
          />
          
        </section>

        <Modal
            isOpen={modal}
            onClose={handleClose}
            heading={"Add New User"}
            positiveText={"Invite"}
            onSubmit={handleSubmit}
        >
          <div>

          </div>
        </Modal>
      </>
    );
}

export default User;