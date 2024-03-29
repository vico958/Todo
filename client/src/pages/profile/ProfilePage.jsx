import React, { useState } from "react";
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
import LoaderAfterAction from "../../components/loader/LoaderAfterAction";

const ProfilePage = () => {
  const user = useAuthUser();
  const toast = useToast();
  const [showLoaderAfterChange, setShowLoaderAfterChange] = useState(false);

  const onSubmitChangePassword = async (data) => {
    try{
      setShowLoaderAfterChange(true);
      const { oldPassword, newPassword } = data;
      const {token} = user
      const result = await userClient.changePassword(oldPassword, newPassword, token);
      toastForAllProfile("Change Password Success.", result, "success")
      }catch(error){
        toastForAllProfile("Failed to change password.", error.message, "error")
      //TODO
    }finally{
      setShowLoaderAfterChange(false);
    }
  };

  const onSubmitChageFullName = async (data) => {
    try{
      setShowLoaderAfterChange(true);
      const { password, fullName } = data;
      const {token} = user
      const result = await userClient.changeFullName(password, fullName, token);
      toastForAllProfile("Change Full Name Success.", result + ". If you want to see the changes, relogin please", "success")
      }catch(error){
        toastForAllProfile("Failed to change Full Name.", error.message, "error")
      //TODO
    }finally{
      setShowLoaderAfterChange(false);
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
    <>
    {showLoaderAfterChange? <LoaderAfterAction/> :
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
  }
    </>
  );
};

export default ProfilePage;
