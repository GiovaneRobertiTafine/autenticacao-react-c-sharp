import { useEffect, useState } from "react";
import { People } from "../../interfaces/Peoples";
import { getToken } from "../../services/auth.service";
import { getPeoples } from "../../services/people.service";

export default function Peoples() {
    const [peoples, setPeoples] = useState<People[]>(null);

    useEffect(() => {
        let componentMounted = true;
        getPeoples(getToken())
            .then((res) => {
                if (componentMounted) {
                    setPeoples(res.data);

                }
            });
        return () => {
            componentMounted = true;
        };

    }, []);
    return (
        <>
            <p>Peoples</p>
            <ul>
                {
                    peoples ?
                        peoples.map((people, i) => {
                            return (
                                <li key={people.id_people}>
                                    {people.nome} | {people.email} |
                                    {people.pais} | {people.empresa}

                                </li>
                            );
                        })
                        : null
                }
            </ul>
        </>
    );
}