import {
  Paper,
  Box,
  Avatar,
  Typography,
  Card,
  CardActionArea,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getUsersBySearhTerm } from '../firebase';

const SearchResultProfile = ({
  user: { name, walletId, profilePicture },
}: any) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ marginBottom: 1, maxWidth: '350px' }}>
      <CardActionArea onClick={() => navigate(`/profiles/${walletId}`)}>
        <Box sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={profilePicture} />
          <Typography>{name || walletId}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

const ProfileSearchResults = () => {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const showSearchResults = async () => {
      const search = searchParams.get('q');
      if (search) {
        if (search.startsWith('0x')) {
          navigate(`/profiles/${search}`);
        } else {
          const res = await getUsersBySearhTerm(searchParams.get('q'));
          setUsers(res);
        }
      }
    };
    console.log('fetching params ', searchParams.get('q'));
    showSearchResults();
  }, [searchParams]);
  return (
    <Box sx={{ p: 2 }}>
      {users.length ? (
        users.map((user: any, index: number) => {
          return <SearchResultProfile key={index} user={user} />;
        })
      ) : (
        <Typography>No users found</Typography>
      )}
    </Box>
  );
};

export default ProfileSearchResults;
