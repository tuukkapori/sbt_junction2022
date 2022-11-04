import { useEffect, useState } from 'react';
import { useMetamask } from '../metamask';

export default function Welcome() {
  const { user, contract } = useMetamask();
  const [owner, setOwner] = useState<string>('');
  const getOwner = async () => {
    try {
      const response = await contract.owner();
      setOwner(response);
    } catch (e) {
      console.log('Error getting owner:', e);
    }
  };

  useEffect(() => {
    getOwner();
  }, []);

  const role =
    owner.toLocaleLowerCase() === user.address.toLocaleLowerCase()
      ? 'owner'
      : 'user';

  return (
    <>
      <div>{role} connected:</div>
      <div>{user.address}</div>
    </>
  );
}
