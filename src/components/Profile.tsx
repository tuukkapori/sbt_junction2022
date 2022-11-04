import { Avatar, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import Education from './Education'
import WorkHistory from './WorkHistory'
import Connect from './Connect'
import { getProfileInfo } from '../services/profileInfo'
import { getUserByWalletId } from '../firebase'

const Profile = ({ id, name, bio }: { name: string; description: string }) => {
  const [profileInfo, setProfileInfo] = useState<any>(undefined)
  const [education, setEducation] = useState(null)
  const [workHistory, setWorkHistory] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const { education: educationData, workHistory: workHistoryData } =
        await getProfileInfo()
      setEducation(educationData)
      setWorkHistory(workHistoryData)
      const user = await getUserByWalletId('walletid1234')
      setProfileInfo(user)
    }
    fetchData()
  }, [])

  return (
    <div>
      <Paper elevation={3} sx={{ padding: 5 }}>
        <div>{name}</div>
        <div>{description}</div>
        <Avatar src={profileInfo ? profileInfo.profilePicture : ''} />
        <Connect />
      </Paper>
      <Education items={education} />
      <WorkHistory items={workHistory} />
    </div>
  )
}

export default Profile
