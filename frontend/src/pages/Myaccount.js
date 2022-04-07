import React from 'react';

import isConnected from '../js/isConnected';
import { Navigate } from 'react-router-dom';
import { ConnectionNavbar } from './Navbar';
import Modal from 'react-modal';

import { toast, ToastContainer } from 'react-toastify';

const ModalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#303030',
        color: '#efefef',
        width: '50%',
        height: '60%',
    },
}

class Myaccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: isConnected(),
            user: [],
            image_url: '',
            modalIsOpen: false,
        };
        this.handleSubmitDeconnection = this.handleSubmitDeconnection.bind(this);
        this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
        this.handleChangeUserImage = this.handleChangeUserImage.bind(this);
        this.encodeBase64 = this.encodeBase64.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        if (this.state.isLoggedIn) {
            fetch('http://localhost:5001/user', {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
                    'Content-Type': 'application/json'
                }),
                mode: 'cors'
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ user: data });
                this.setState({ image_url: data.image_url });
            });
        }
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    handleSubmitDeconnection(event) {
        event.preventDefault();
        this.setState({ isLoggedIn: false });
        localStorage.removeItem('user_token');
    }

    handleSubmitDelete(event) {
        event.preventDefault();
        fetch('http://localhost:5001/user', {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
                'Content-Type': 'application/json'
            }),
            mode: 'cors'
        });
        localStorage.removeItem('user_token');
        this.setState({ isLoggedIn: false });
    }

    isFileImage(file) {
        return file && file['type'].split('/')[0] === 'image';
    }

    encodeBase64(img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL('image/jpeg');
    }

    handleChangeUserImage(event) {
        event.preventDefault();

        if (event.target.files.length > 1) {
            toast.error("Can't post more than 1 image !", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        const file = event.target.files[0];

        if (this.isFileImage(file)) {

            let image_body = {
                image_url: this.encodeBase64(file)
            };

            fetch('http://localhost:5001/user/profile_image', {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
                    'Content-Type': 'application/json'
                }),
                mode: 'cors',
                body: JSON.stringify(image_body)
            }).then(() => {
                this.setState({ image_url: this.encodeBase64(file) });
                toast.success('Image changed !', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            });
        } else {
            toast.error('This is not an image !', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }

    render() {
        if (!this.state.isLoggedIn)
            return <Navigate to="/login" />;
        return (
            <div className='w-screen background h-screen mx-auto text-white text-2xl bg-[#141414]'>
                <ConnectionNavbar />
                <div className='grid place-items-center not_connected'>
                    <div className='p-5 bg-[#303030] h-3/4 w-3/5 rounded-2xl'>
                        <div className='grid place-items-center'>
                            <h1>Welcome back, {this.state.user.nickname} !</h1>
                            <h1>Firstname : {this.state.user.firstname}</h1>
                            <h1>Name : {this.state.user.name}</h1>
                            <h1>Email : {this.state.user.email}</h1>
                            <div>
                                <img className='w-52 h-52' src={this.state.image_url} />
                                <button onClick={this.openModal}>Open Modal</button>
                            </div>

                            <div className='grid grid-cols-2 space-x-5'>
                                <button onClick={this.handleSubmitDeconnection} className='px-5 py-3 rounded-lg bg-gradient-to-r from-[#8b1418] to-[#d71f26] hover:from-[#d71f26] hover:to-[#d15156]'>
                                    Deconnection
                                </button>
                                <button onClick={this.handleSubmitDelete} className='px-5 py-3 rounded-lg bg-gradient-to-r from-[#d71f26] to-[#8b1418] hover:from-[#d15156] hover:to-[#d71f26]'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    style={ModalStyle}
                >
                    <div className='text-2xl'>
                        <h1 className='pb-5'>Choose your avatar:</h1>
                        <div className='grid grid-cols-3 place-items-center pb-10 space-y-3'>
                            <button onClick={this.handleChangeUserImage}>
                                <img className='w-32 h-32 hover:opacity-25' alt='1' src='https://cdn-icons-png.flaticon.com/512/4128/4128170.png' />
                            </button>

                            <button>
                                <img className='w-32 h-32 hover:opacity-25' alt='2' src='https://cdn-icons-png.flaticon.com/512/4128/4128385.png' />
                            </button>

                            <button>
                                <img className='w-32 h-32 hover:opacity-25' alt='3' src='https://cdn-icons-png.flaticon.com/512/219/219988.png' />
                            </button>

                            <button>
                                <img className='w-32 h-32 hover:opacity-25' alt='4' src='https://cdn-icons-png.flaticon.com/512/4128/4128226.png' />
                            </button>

                            <button>
                                <img className='w-32 h-32 hover:opacity-25' alt='5' src='https://cdn-icons-png.flaticon.com/512/4128/4128196.png' />
                            </button>

                            <button>
                                <img className='w-32 h-32 hover:opacity-25' alt='6' src='https://cdn-icons-png.flaticon.com/512/206/206853.png' />
                            </button>

                            <button>
                                <img className='w-32 h-32 hover:opacity-25' alt='7' src='https://cdn-icons-png.flaticon.com/512/4128/4128309.png' />
                            </button>

                            <button>
                                <img className='w-32 h-32 hover:opacity-25' alt='8' src='https://cdn-icons-png.flaticon.com/512/4128/4128273.png' />
                            </button>

                            <button>
                                <img className='w-32 h-32 hover:opacity-25' alt='9' src='https://cdn-icons-png.flaticon.com/512/4128/4128296.png' />
                            </button>
                        </div>
                        <div className='flex space-x-5 text-center items-center'>
                            <button className='px-5 py-2 rounded-lg bg-gradient-to-r from-[#8b1418] to-[#d71f26] hover:from-[#d71f26] hover:to-[#d15156]' >Save</button>
                            <button onClick={this.closeModal} className='px-5 py-2 rounded-lg bg-gradient-to-r from-[#d71f26] to-[#8b1418] hover:from-[#d15156] hover:to-[#d71f26]' >Cancel</button>
                        </div>
                    </div>
                </Modal>
                <ToastContainer toastStyle={{ backgroundColor: '#141414', color: '#FFFFFF' }} />
            </div>
        );
    }
}

export default Myaccount;