import { Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Education from './Education'
import WorkHistory from './WorkHistory'
import Connect from './Connect'
import { getProfileInfo } from '../services/profileInfo'
import { getUserByWalletId } from '../firebase'
import { ContactlessOutlined } from '@mui/icons-material'

const Profile = ({
  id,
  name,
  bio,
  currentUser,
}: {
  id: string
  name: string
  bio: string
  currentUser: { id: string }
}) => {
  const [education, setEducation] = useState(null)
  const [workHistory, setWorkHistory] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const { education: educationData, workHistory: workHistoryData } =
        await getProfileInfo()
      setEducation(educationData)
      setWorkHistory(workHistoryData)
      const user = await getUserByWalletId('walletid1234')
      console.log('user from db ', user)
    }
    fetchData()
  }, [])

  return (
    <div>
      <Paper elevation={3} sx={{ padding: 5 }}>
        {name ? (
          <Typography variant="h3">{name}</Typography>
        ) : (
          <Typography variant="h3">{id}</Typography>
        )}
        <div>{bio}</div>
        <div>connections: 42</div>
        {id != currentUser.id && <Connect />}
      </Paper>
      <Education items={education} />
      <WorkHistory items={workHistory} />
    </div>
  )
}

export default Profile
