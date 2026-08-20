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
const URL = "http://localhost:6969/api/";
import auth from "./jsmod/auth.js";
export default function App({ name }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
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
                  Log in
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Username"
                    placeholder="Enter your username"
                    variant="bordered"
                    value={username}
                    onValueChange={setusername}
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
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                      classNames={{
                        label: "text-small",
                      }}
                    >
                      Remember me
                    </Checkbox>
                    <Link color="primary" href="#" size="sm">
                      Forgot password?
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
                      (onClose,
                      () => {
                        auth.login(username, password, (err) => {
                          setErrTittle(err.tittle);
                          setErrBody(err.body);
                          onErrChange();
                        });
                        console.log("fetched");
                      })
                    }
                  >
                    Log in
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
