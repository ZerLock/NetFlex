import React from 'react';

import isConnected from '../js/isConnected';
import { Navigate } from 'react-router-dom';
import { ConnectionNavbar } from './Navbar';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

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
        width: '40%',
        height: '60%',
        borderRadius: 15,
        overflow: 'hidden',
    },
}

const DeleteModalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#303030',
        color: '#efefef',
        width: '20%',
        height: '20%',
        borderRadius: 15,
        overflow: 'hidden',
    },
}

const PasswordModal = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#303030',
        color: '#efefef',
        width: '30%',
        height: '40%',
        borderRadius: 15,
        overflow: 'hidden',
    },
}

const NicknameModal = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#303030',
        color: '#efefef',
        width: '30%',
        height: '30%',
        borderRadius: 15,
        overflow: 'hidden',
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
            deleteConfirmationModal: false,
            passwordModal: false,
            old_password: '',
            new_password: '',
            confirmed_password: '',
            nicknameModal: false,
            new_nickname: '',
        };
        this.handleSubmitDeconnection = this.handleSubmitDeconnection.bind(this);
        this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
        this.handleChangeUserImage = this.handleChangeUserImage.bind(this);
        this.encodeBase64 = this.encodeBase64.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.openPasswordModal = this.openPasswordModal.bind(this);
        this.closePasswordModal = this.closePasswordModal.bind(this);
        this.handleChangeUserPassword = this.handleChangeUserPassword.bind(this);
        this.closeNicknameModal = this.closeNicknameModal.bind(this);
        this.openNicknameModal = this.openNicknameModal.bind(this);
        this.handleSubmitNickname = this.handleSubmitNickname.bind(this);
    }

    componentDidMount() {
        Modal.setAppElement('body');
        if (this.state.isLoggedIn) {
            fetch('http://0.0.0.0:5001/user', {
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

    openNicknameModal() {
        this.setState({ nicknameModal: true });
    }

    closeNicknameModal() {
        this.setState({ nicknameModal: false });
    }

    openDeleteModal() {
        this.setState({ deleteConfirmationModal: true });
    }

    closeDeleteModal() {
        this.setState({ deleteConfirmationModal: false });
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    openPasswordModal() {
        this.setState({ passwordModal: true });
    }

    closePasswordModal() {
        this.setState({ old_password: '' });
        this.setState({ new_password: '' });
        this.setState({ confirmed_password: '' });
        this.setState({ passwordModal: false });
    }

    handleSubmitDeconnection(event) {
        event.preventDefault();
        this.setState({ isLoggedIn: false });
        localStorage.removeItem('user_token');
    }

    handleSubmitNickname(event) {
        event.preventDefault();
        if (!this.state.new_nickname || this.state.new_nickname === '') {
            toast.error("Please fill the form !", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            this.setState({ new_nickname: '' });
            return;
        }

        let nickname_body = {
            nickname: this.state.new_nickname
        };

        fetch('http://0.0.0.0:5001/user/nickname', {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            body: JSON.stringify(nickname_body)
        })
        .then(response => response.json())
        .then(data => {
            toast.success("Nickname changed !", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            this.state.user.nickname = this.state.new_nickname;
            this.setState({ new_nickname: '' });
            this.closeNicknameModal();
        });
    }

    handleSubmitDelete(event) {
        event.preventDefault();
        fetch('http://0.0.0.0:5001/user', {
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

    handleChangeUserImage(event, url) {
        event.preventDefault();

        if (!url || url === '') {
            toast.error("Can't change the image !", {
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

        let image_body = {
            image_url: url,
        };

        fetch('http://0.0.0.0:5001/user/profile_image', {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            body: JSON.stringify(image_body)
        }).then(() => {
            this.setState({ image_url: url });
            toast.success('Image changed !', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            this.closeModal();
        });
    }

    handleChangeUserPassword(event) {
        event.preventDefault();
        if (!this.state.old_password || this.state.old_password === '' || !this.state.confirmed_password || this.state.confirmed_password === '' || !this.state.new_password || this.state.new_password === '') {
            toast.error("You must fill all the form !", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            this.setState({ old_password: '' });
            this.setState({ new_password: '' });
            this.setState({ confirmed_password: '' });
            this.setState({ passwordModal: false });
            return;
        }
        if (this.state.new_password !== this.state.confirmed_password) {
            toast.error("New password and confirmed password must be same !", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            this.setState({ old_password: '' });
            this.setState({ new_password: '' });
            this.setState({ confirmed_password: '' });
            this.setState({ passwordModal: false });
            return;
        }

        let password_body = {
            old: this.state.old_password,
            new: this.state.new_password
        };

        fetch('http://0.0.0.0:5001/user/password', {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            body: JSON.stringify(password_body)
        })
        .then(() => {
            toast.success('Password changed !', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            this.setState({ old_password: '' });
            this.setState({ new_password: '' });
            this.setState({ confirmed_password: '' });
            this.setState({ passwordModal: false });
        });
    }

    render() {
        if (!this.state.isLoggedIn)
            return <Navigate to="/login" />;
        return (
            <div className='w-screen background h-screen mx-auto text-white text-2xl bg-[#141414]'>
                <ConnectionNavbar />
                <div className='grid place-items-center not_connected'>
                    <div className='p-5 bg-[#303030] h-3/5 w-1/2 rounded-2xl'>
                        <h1 className='mb-10 mt-5 grid place-items-center text-5xl'>Welcome back, {this.state.user.nickname} !</h1>
                        <div className='grid grid-cols-2 place-items-center'>
                            <div>
                                <button onClick={this.openModal} title='Change profile picture'>
                                    <img className='w-52 h-52 hover:opacity-25' src={this.state.image_url} />
                                </button>
                            </div>
                            <div className='space-y-3'>
                                <h1><b>Firstname</b> : {this.state.user.firstname}</h1>
                                <h1><b>Name</b> : {this.state.user.name}</h1>
                                <h1><b>Email</b> : {this.state.user.email}</h1>
                                <div className='grid place-items-start space-y-3 pt-3'>
                                    <button onClick={this.openPasswordModal} className='border-b-2 hover:text-gray-300'>Change password</button>
                                    <button onClick={this.openNicknameModal} className='border-b-2 hover:text-gray-300'>Change nickname</button>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 place-items-center mt-20'>
                            <Link to='/'>
                                <button title='Back to home' className='bg-white rounded-lg px-5 py-3 text-black text-2xl hover:bg-gray-300 hover:opacity-70'>
                                    NetFlex Home
                                </button>
                            </Link>
                            <button onClick={this.handleSubmitDeconnection} title='Deconnection' className='px-5 py-3 mr-3 rounded-lg bg-gradient-to-r from-[#df161d] to-[#d71f26] hover:from-[#d71f26] hover:to-[#da3d42]'>
                                Deconnection
                            </button>
                            <button onClick={this.openDeleteModal} title='Delete your NetFlex account' className='px-5 py-3 rounded-lg bg-gradient-to-r from-[#d71f26] to-[#df161d] hover:from-[#da3d42] hover:to-[#d71f26]'>
                                Delete account
                            </button>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.passwordModal}
                    style={PasswordModal}
                >
                    <div className='text-2xl'>
                        <div className='flex'>
                            <h1 className='mt-2'>Change password :</h1>
                            <button onClick={this.closePasswordModal} className='ml-auto p-2 rounded-lg hover:bg-[#202020]' >X</button>
                        </div>
                        <div className='space-y-3 mt-5'>
                            <input type='password' placeholder='Old password' value={this.state.old_password} onChange={e => this.setState({ old_password: e.target.value})} className='w-full p-4 bg-transparent border-2 rounded-lg focus:outline-none' />
                            <input type='password' placeholder='New password' value={this.state.new_password} onChange={e => this.setState({ new_password: e.target.value})} className='w-full p-4 bg-transparent border-2 rounded-lg focus:outline-none' />
                            <input type='password' placeholder='Confirm new password' value={this.state.confirmed_password} onChange={e => this.setState({ confirmed_password: e.target.value})}  className='w-full p-4 bg-transparent border-2 rounded-lg focus:outline-none' />
                            <button onClick={this.handleChangeUserPassword} className='px-5 py-2 rounded-lg bg-gradient-to-r from-[#d71f26] to-[#8b1418] hover:from-[#d15156] hover:to-[#d71f26]' >Confirm</button>
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={this.state.deleteConfirmationModal}
                    style={DeleteModalStyle}
                >
                    <div className='text-2xl'>
                        <div className='flex'>
                            <h1 className='mt-2'>Are you sure ?</h1>
                            <button onClick={this.closeDeleteModal} className='ml-auto p-2 hover:bg-[#202020] rounded-lg'>X</button>
                        </div>
                        <div className='grid place-items-center mt-8 text-3xl'>
                            <button onClick={this.handleSubmitDelete} className='px-5 py-2 rounded-lg bg-gradient-to-r from-[#d71f26] to-[#8b1418] hover:from-[#d15156] hover:to-[#d71f26]' >Confirm</button>
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={this.state.nicknameModal}
                    style={NicknameModal}
                >
                    <div className='text-2xl'>
                        <div className='flex'>
                            <h1 className='mt-2'>Change nickname :</h1>
                            <button onClick={this.closeNicknameModal} className='ml-auto p-2 hover:bg-[#202020] rounded-lg'>X</button>
                        </div>
                        <div className='grid place-items-center space-y-5 mt-8 text-3xl'>
                            <input onChange={e => this.setState({ new_nickname: e.target.value })} type='text' placeholder='New nickname' value={this.state.new_nickname} onChange={e => this.setState({ new_nickname: e.target.value})} className='w-full p-4 bg-transparent border-2 rounded-lg focus:outline-none' />
                            <button onClick={this.handleSubmitNickname} className='px-5 py-2 rounded-lg bg-gradient-to-r from-[#d71f26] to-[#8b1418] hover:from-[#d15156] hover:to-[#d71f26]' >Confirm</button>
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    style={ModalStyle}
                >
                    <div className='text-2xl'>
                        <h1 className='pb-5'>Choose your avatar:</h1>
                        <div className='grid grid-cols-3 place-items-center pb-10 space-y-3'>
                            <button onClick={e => this.handleChangeUserImage(e, 'https://cdn-icons-png.flaticon.com/512/5089/5089983.png')}>
                                <img className='w-32 h-32 hover:opacity-25' alt='1' src='https://cdn-icons-png.flaticon.com/512/5089/5089983.png' />
                            </button>

                            <button onClick={e => this.handleChangeUserImage(e, 'https://cdn-icons-png.flaticon.com/512/4128/4128385.png')}>
                                <img className='w-32 h-32 hover:opacity-25' alt='2' src='https://cdn-icons-png.flaticon.com/512/4128/4128385.png' />
                            </button>

                            <button onClick={e => this.handleChangeUserImage(e, 'https://cdn-icons-png.flaticon.com/512/219/219988.png')}>
                                <img className='w-32 h-32 hover:opacity-25' alt='3' src='https://cdn-icons-png.flaticon.com/512/219/219988.png' />
                            </button>

                            <button onClick={e => this.handleChangeUserImage(e, 'https://cdn-icons-png.flaticon.com/512/4128/4128226.png')}>
                                <img className='w-32 h-32 hover:opacity-25' alt='4' src='https://cdn-icons-png.flaticon.com/512/4128/4128226.png' />
                            </button>

                            <button onClick={e => this.handleChangeUserImage(e, 'https://cdn-icons-png.flaticon.com/512/4128/4128196.png')}>
                                <img className='w-32 h-32 hover:opacity-25' alt='5' src='https://cdn-icons-png.flaticon.com/512/4128/4128196.png' />
                            </button>

                            <button onClick={e => this.handleChangeUserImage(e, 'https://cdn-icons-png.flaticon.com/512/206/206853.png')}>
                                <img className='w-32 h-32 hover:opacity-25' alt='6' src='https://cdn-icons-png.flaticon.com/512/206/206853.png' />
                            </button>

                            <button onClick={e => this.handleChangeUserImage(e, 'https://cdn-icons-png.flaticon.com/512/4128/4128309.png')}>
                                <img className='w-32 h-32 hover:opacity-25' alt='7' src='https://cdn-icons-png.flaticon.com/512/4128/4128309.png' />
                            </button>

                            <button onClick={e => this.handleChangeUserImage(e, 'https://cdn-icons-png.flaticon.com/512/4128/4128273.png')}>
                                <img className='w-32 h-32 hover:opacity-25' alt='8' src='https://cdn-icons-png.flaticon.com/512/4128/4128273.png' />
                            </button>

                            <button onClick={e => this.handleChangeUserImage(e, 'https://cdn-icons-png.flaticon.com/512/4128/4128296.png')}>
                                <img className='w-32 h-32 hover:opacity-25' alt='9' src='https://cdn-icons-png.flaticon.com/512/4128/4128296.png' />
                            </button>
                        </div>
                        <button onClick={this.closeModal} className='px-5 py-2 rounded-lg bg-gradient-to-r from-[#d71f26] to-[#8b1418] hover:from-[#d15156] hover:to-[#d71f26]' >Cancel</button>
                    </div>
                </Modal>
                <ToastContainer toastStyle={{ backgroundColor: '#141414', color: '#FFFFFF' }} />
            </div>
        );
    }
}

export default Myaccount;