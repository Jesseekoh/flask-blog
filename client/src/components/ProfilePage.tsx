import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

type Profile = {
    username: string;
    email: string;
};
const ProfilePage = () => {
    const { profileId } = useParams();
    const [profile, setProfile] = useState<Profile>();

    const fetchProfile = async () => {
        const resp = await fetch(
            import.meta.env.VITE_BASE_API_URL + `/user/${profileId}`
        );
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
