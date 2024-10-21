import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const ProfilePage = () => {
    const { profileId } = useParams();
    const [profile, setProfile] = useState();
    const fetchProfile = async () => {
        const resp = await fetch(`http://localhost:8000/user/${profileId}`);
        if (resp.status == 200) {
            let data = await resp.json();
            data = data.data;
            console.log(data);

            setProfile(data);
        }
        if (resp.status == 404) {
            //
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div>
            {profile ? (
                <>
                    <h1>{profile.username}</h1>
                    <span>{profile.email}</span>
                </>
            ) : (
                ''
            )}
        </div>
    );
};

export default ProfilePage;
