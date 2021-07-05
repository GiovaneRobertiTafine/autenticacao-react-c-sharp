import { useForm } from 'react-hook-form';
import './styles.css';

interface User {
    Nome: string;
    Senha: string;
}

export default function Logon(props: User) {
    const { register, handleSubmit, formState: { errors } } = useForm<User>();

    const onSubmit = handleSubmit((data) => {
        alert(JSON.stringify(data));
    });

    return (
        <div className="w-100 d-flex justify-content-center align-items-center container-login">
            <div className="card h-50">
                <div className="card-body">
                    <h5 className="card-title">Login</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Informe suas credênciais</h6>

                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="login">Usuário</label>
                            <input {...register("Nome", { required: true })} type="text" className="form-control" id="login" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">Ex: Nome</div>
                            {
                                errors.Nome && <small className="text-danger">Nome é obrigatório</small>
                            }
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="password">Senha</label>
                            <input {...register("Senha", { required: true })} type="password" className="form-control" id="password" />
                            {
                                errors.Senha && <small className="text-danger">Senha é obrigatório</small>
                            }
                        </div>
                        <button type="submit" className="btn btn-primary">Entrar</button>
                    </form>
                </div>
            </div>
        </div >
    );
}