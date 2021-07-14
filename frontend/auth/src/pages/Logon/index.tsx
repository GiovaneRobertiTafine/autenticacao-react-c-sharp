import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import './styles.css';
import { Toast } from 'bootstrap';
import { useState } from 'react';
import { User } from '../../interfaces/User';
import { loginService, setToken } from '../../services/auth.service';

export default function Logon() {
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');
    const [load, setLoad] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        setLoad(true);
        loginService(data)
            .then((res) => {
                if (res?.status !== 200) {
                    setErrorMessage(res.response?.data.message ?? 'Erro interno, tente novamente');
                    var toastElList = [].slice.call(document.querySelectorAll('.toast'));
                    var toastList = toastElList.map(function (toastEl) {

                        return new Toast(toastEl);
                    });
                    toastList.forEach(toast => toast.show());

                } else {
                    setToken(res.data);
                    history.push('/manager');
                }
                setLoad(false);
            });
    });


    return (
        <div className="w-100 d-flex justify-content-center align-items-center container-login">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Login</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Informe suas credênciais</h6>

                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="login">Usuário</label>
                            <input {...register("nome", { required: true })} type="text" className="form-control" id="login" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">Ex: Nome</div>
                            {
                                errors.nome && <small className="text-danger">Nome é obrigatório</small>
                            }
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="password">Senha</label>
                            <input {...register("senha", { required: true })} type="password" className="form-control" id="password" />
                            {
                                errors.senha && <small className="text-danger">Senha é obrigatório</small>
                            }
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={load}>Entrar
                        </button>
                        {load &&
                            <div className="spinner-border spinner-border-sm mx-3" role="status">
                            </div>
                        }
                    </form>
                </div>
            </div>
            <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                <div className="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">
                            {errorMessage}
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </div >
    );
}