import {
  Paper,
  Box,
  Avatar,
  Typography,
  Card,
  CardActionArea,
  LinearProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getUsersBySearhTerm } from '../services/firebase';

const SearchResultProfile = ({
  user: { name, walletId, profilePicture },
}: any) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ marginBottom: 1, width: '400px', maxWidth: '100%' }}>
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const showSearchResults = async () => {
      const search = searchParams.get('q');
      if (search) {
        setLoading(true);
        if (search.startsWith('0x')) {
          navigate(`/profiles/${search}`);
        } else {
          const res = await getUsersBySearhTerm(searchParams.get('q'));
          setUsers(res);
        }
        setLoading(false);
      }
    };
    showSearchResults();
  }, [searchParams]);

  return (
    <>
      {loading && (
        <LinearProgress
          sx={{ position: 'absolute', top: '55px', left: 0, right: 0 }}
        />
      )}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
        }}>
        {users.length ? (
          users.map((user: any, index: number) => {
            return <SearchResultProfile key={index} user={user} />;
          })
        ) : (
          <Typography>No users found</Typography>
        )}
      </Box>
    </>
  );
};

export default ProfileSearchResults;
