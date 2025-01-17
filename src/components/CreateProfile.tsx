import {
  Box,
  InputLabel,
  TextareaAutosize,
  TextField,
  Typography,
  Avatar,
  IconButton,
  Button,
  Tooltip,
  CircularProgress,
  Card,
  CardActionArea,
  Backdrop,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, uploadProfilePic } from '../services/firebase';
import InstitutionIcon from '@mui/icons-material/AccountBalance';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import PersonIcon from '@mui/icons-material/Person';
import { getCurrentWalletFromLocalStorage } from '../services/localStorage';

const SelectAccountType = ({ setWizardStep }: any) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='subtitle1'>1. Select Account type</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Card>
          <CardActionArea
            onClick={() => setWizardStep('createIndividualAccount')}
            sx={{
              p: 2,
            }}>
            <PersonIcon sx={{ width: '100px', height: '100px' }} />
            <Typography textAlign='center'>Individual</Typography>
          </CardActionArea>
        </Card>

        <Card>
          <CardActionArea
            onClick={() => setWizardStep('createInstitutionalAccount')}
            sx={{
              p: 2,
            }}>
            <InstitutionIcon sx={{ width: '100px', height: '100px' }} />
            <Typography textAlign='center'>Institution</Typography>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};

const CreateInstitutionalAccount = ({ setWizardStep }: any) => {
  const [verifying, setVerifying] = useState(false);
  const [institutionInfo, setInstitutionInfo] = useState<any>(null);
  const navigate = useNavigate();
  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setInstitutionInfo({
        name: 'Amazing Company ltd',
        bio: 'We are the worlds most innovative software company',
        profilePicture: '',
        accountType: 'institution',
        private: false,
      });
    }, 2000);
  };

  const handleCreateProfile = async () => {
    await createUser(getCurrentWalletFromLocalStorage(), institutionInfo);
    navigate('/profiles/me');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}>
      <Typography variant='subtitle1'>
        2. Enter your institution info
      </Typography>
      {!institutionInfo && (
        <Button
          variant='contained'
          sx={{ fontWeight: 600 }}
          size='large'
          onClick={handleVerify}
          disabled={verifying}>
          Verify your institution
        </Button>
      )}

      {institutionInfo && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}>
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <VerifiedIcon />
              <Typography
                variant='subtitle2'
                style={{ margin: 0, marginLeft: 10 }}>
                {institutionInfo.name}
              </Typography>
            </Box>
            <Typography variant='subtitle2'>
              Company data has been automatically filled.
            </Typography>
          </Box>
          <Button
            variant='contained'
            sx={{ fontWeight: 600 }}
            onClick={handleCreateProfile}>
            Create profile!
          </Button>
        </Box>
      )}
      <Backdrop open={verifying}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );
};

const CreateIndividualAccount = ({ setWizardStep }: any) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [privateProfile, setPrivateProfile] = useState(true);
  const [loadingPpf, setLoadingPpf] = useState(false);
  const [creatingProfile, setCreatingProfile] = useState(false);

  const [profilePicFile, setProfilePicFile] = useState<any>(null);

  const navigate = useNavigate();

  const onFileChange = async (e: any) => {
    setLoadingPpf(true);
    const file = e.target.files[0];
    console.log('file change ', e);
    setProfilePicFile(file);

    const url = await uploadProfilePic(file, window.ethereum.selectedAddress);
    console.log('url from uploading ppf ', url);
    setProfilePicture(url);
    setLoadingPpf(false);
  };

  const handleSetProfilePic = () => {
    const input = document.getElementById('profile-pic-selector');
    input.click();
  };

  const handleCreateProfile = async () => {
    console.log('creating profile...');
    setCreatingProfile(true);
    await createUser(getCurrentWalletFromLocalStorage(), {
      name,
      bio,
      profilePicture,
      accountType: 'individual',
      private: privateProfile,
    });
    navigate('/profiles/me');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box mx={'auto'}>
        <Typography variant='h5'>Create individual account</Typography>
      </Box>
      <Tooltip title='add a profile picture'>
        <IconButton onClick={handleSetProfilePic}>
          {loadingPpf ? (
            <Avatar
              src={profilePicFile ? URL.createObjectURL(profilePicFile) : ''}
              sx={{ width: 80, height: 80, marginY: 2 }}>
              <CircularProgress />
            </Avatar>
          ) : (
            <Avatar
              src={profilePicFile ? URL.createObjectURL(profilePicFile) : ''}
              sx={{ width: 80, height: 80, marginY: 2 }}></Avatar>
          )}
        </IconButton>
      </Tooltip>
      <input
        type='file'
        id='profile-pic-selector'
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
      <TextField
        label='Name (optional)'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <InputLabel>Bio (optional)</InputLabel>
      <TextareaAutosize
        value={bio}
        onChange={e => setBio(e.target.value)}
        minRows={5}
        style={{
          fontFamily: 'Roboto',
          fontSize: '18px',
          background: 'rgba(0, 0, 0, 0)',
          color: 'white',
        }}
      />
      <FormControlLabel
        control={<Switch defaultChecked />}
        value={privateProfile}
        onChange={() => setPrivateProfile(prev => !prev)}
        label='Private Account'
        sx={{ fontWeight: 600 }}
      />
      <Typography
        variant='subtitle2'
        sx={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
        If you set your account to be private, other users cannot find you by
        name.
      </Typography>

      <Button variant='contained' sx={{ mt: 2 }} onClick={handleCreateProfile}>
        Create profile!
      </Button>
    </Box>
  );
};

const CreateProfile = ({ currentWallet, setCurrentWallet }: any) => {
  const [wizardStep, setWizardStep] = useState('selectAccountType');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 4,
      }}>
      <Typography variant='h4'>Create a Zerify account</Typography>
      {wizardStep !== 'selectAccountType' && (
        <Button onClick={() => setWizardStep('selectAccountType')}>
          <ArrowLeftIcon />
          back
        </Button>
      )}
      <Box
        sx={{
          marginTop: 3,
        }}>
        {wizardStep === 'selectAccountType' && (
          <SelectAccountType setWizardStep={setWizardStep} />
        )}
        {wizardStep === 'createInstitutionalAccount' && (
          <CreateInstitutionalAccount setWizardStep={setWizardStep} />
        )}
        {wizardStep === 'createIndividualAccount' && (
          <CreateIndividualAccount setWizardStep={setWizardStep} />
        )}
      </Box>
    </Box>
  );
};

export default CreateProfile;
