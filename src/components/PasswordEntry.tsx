import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
interface PasswordEntryProps {
  correctPassword: string;
  onCorrectPassword: () => void;
}
const getPasswordByTaskId = (taskId: number): string => {
  const passwords: {
    [key: number]: string;
  } = {
    1: '1111',
    2: '2222',
    3: '3333',
    4: '4444',
    5: '5555'
  };
  return passwords[taskId] || '';
};
const PasswordEntry: React.FC<PasswordEntryProps> = ({
  correctPassword,
  onCorrectPassword
}) => {
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === correctPassword.toLowerCase()) {
      toast.success('Correct password! Starting task...');
      onCorrectPassword();
    } else {
      setAttempts(attempts + 1);
      toast.error('Incorrect password, please try again');

      // For demo purposes, show the correct password after 3 attempts
      if (attempts >= 2) {
        toast.info(`Hint: The correct password is "${correctPassword}"`);
      }
    }
  };
  return <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Ask the crew to enter password</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password..." className="w-full" />
        <Button type="submit" className="w-full">
          Verify Password
        </Button>
      </form>
    </div>;
};
export default PasswordEntry;