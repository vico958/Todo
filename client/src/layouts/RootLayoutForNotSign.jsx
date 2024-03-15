import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

// components
import Navbar from "../components/navbar/Navbar"
import Sidebar from "../components/sidebar/Sidebar"

export default function RootLayoutForNotSign() {
  return (
    <>
    <Flex justify="center" mt="20px">
    <Heading>Todo App</Heading>
    </Flex>
        <Outlet />
    </>
  )
}