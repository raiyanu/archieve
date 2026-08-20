import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { MailIcon } from "./MailIcon.jsx";
import { LockIcon } from "./LockIcon.jsx";
import auth from "./jsmod/auth.js";

export default function SignUpButton({ name }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [remember, setremember] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [email, setemail] = useState("");
  const {
    isOpen: isErr,
    onOpen: onErr,
    onOpenChange: onErrChange,
  } = useDisclosure();
  const [ErrTittle, setErrTittle] = useState("Error");
  const [ErrBody, setErrBody] = useState("An unexpected error occured");

  return (
    <>
      <div>
        <Button
          onPress={onOpen}
          color="primary"
          variant="shadow"
          className="hover:bg-transparent hover:text-primary m-3"
        >
          {name}
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          className="dark text-foreground bg-background "
        >
          <ModalContent className="border">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Sign Up
                </ModalHeader>
                <ModalBody>
                  <div className="flex  gap-1">
                    <Input
                      autoFocus
                      label="First Name"
                      placeholder="First name"
                      variant="bordered"
                      value={firstName}
                      onValueChange={setfirstName}
                    />
                    <Input
                      label="Last Name"
                      placeholder="Last name"
                      variant="bordered"
                      value={lastName}
                      onValueChange={setlastName}
                    />
                  </div>
                  <Input
                    label="Username"
                    placeholder="Choose your Username"
                    variant="bordered"
                    value={username}
                    onValueChange={setusername}
                  />
                  <Input
                    label="Email"
                    placeholder="Email address"
                    variant="bordered"
                    value={email}
                    onValueChange={setemail}
                  />
                  <Input
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                    value={password}
                    onValueChange={setpassword}
                  />
                  <Input
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Password"
                    placeholder="Confirm your password"
                    type="password"
                    variant="bordered"
                    value={confirmPassword}
                    onValueChange={setconfirmPassword}
                  />
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                      classNames={{
                        label: "text-small",
                      }}
                      value={remember}
                      onValueChange={setremember}
                    >
                      Remember me
                    </Checkbox>
                    <Link color="primary" href="#" size="sm">
                      Having trouble?
                    </Link>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={
                      async () => {
                        auth.signup(
                          username,
                          firstName,
                          lastName,
                          password,
                          confirmPassword,
                          remember,
                          email,
                          (err) => {
                            setErrTittle(err.tittle);
                            setErrBody(err.body);
                            onErrChange();
                          },
                          onOpenChange,
                        );
                      }
                      // close Modal
                    }
                  >
                    Sign Up
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal
          isOpen={isErr}
          onOpenChange={onErrChange}
          className="dark"
          placement={"center"}
        >
          <ModalContent>
            {(onErr) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {ErrTittle}
                </ModalHeader>
                <ModalBody>{ErrBody}</ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onErr}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
