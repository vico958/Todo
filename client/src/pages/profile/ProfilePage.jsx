import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  useToast
} from "@chakra-ui/react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import ChangePasswordForm from "./ChangePasswordForm";
import userClient from "../../services/userClient";
import ChangeFullNameForm from "./ChangeFullNameForm";
import useChangePassword from "../../hooks/users/useChangePassword";
import useChangeFullName from "../../hooks/users/useChangeFullName";

const ProfilePage = () => {
  const user = useAuthUser();
  const toast = useToast();
  const mutationChangePassword = useChangePassword();
  const mutationChangeFullName = useChangeFullName();
  // useEffect(() => {

  // }, [user])

  const onSubmitChangePassword = async (data) => {
    try{
      const { oldPassword, newPassword } = data;
      const url = userClient.changePasswordUrl();
      const {userId} = user
      const result = await mutationChangePassword.mutateAsync({userId, oldPassword, newPassword, url })
      toastForAllProfile("Change Password Success.", result, "success")
      }catch(error){
        toastForAllProfile("Failed to change password.", error.message, "error")
      //TODO
    }
  };

  const onSubmitChageFullName = async (data) => {
    try{
      const { password, fullName } = data;
      const {userId} = user
      const url = userClient.changeFullNameUrl();
      const result = await mutationChangeFullName.mutateAsync({userId, password, fullName, url});
      toastForAllProfile("Change Full Name Success.", result + ". If you want to see the changes, relogin please", "success")
      }catch(error){
        toastForAllProfile("Failed to change Full Name.", error.message, "error")
      //TODO
    }
  }

  const toastForAllProfile = (title, description, status) => {
    toast({
      title: title,
      description: description,
      duration: 2000,
      isClosable: true,
      position: 'top',
      status: status,
    })
  }

  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>Information</Tab>
        <Tab>Change Password</Tab>
        <Tab>Change Full Name</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Text mb="15px">Email : {user.email}</Text>
          <Text mb="15px">Full Name: {user.fullName}</Text>
        </TabPanel>
        <TabPanel>
          <ChangePasswordForm onSubmitForm={onSubmitChangePassword} />
        </TabPanel>
        <TabPanel>
          <ChangeFullNameForm onSubmitForm={onSubmitChageFullName}/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfilePage;
