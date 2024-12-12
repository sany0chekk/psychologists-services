import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import Button from "../ui/Button";
import Input from "../ui/Input";
import AuthPasswordInput from "./AuthPasswordInput";
import ModalTitle from "../modal/ModalTitle";
import ModalDescr from "../modal/ModalDescr";
import Modal from "../modal/Modal";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export default function AuthLoginModal({ isOpen, closeModal }: Props) {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    closeModal();
    resetForm();
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} className="max-w-[566px]">
      <div>
        <ModalTitle className="mb-5">Log In</ModalTitle>
        <ModalDescr className="mb-10">
          Welcome back! Please enter your credentials to access your account and
          continue your search for a psychologist.
        </ModalDescr>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="mb-4"
            />
            <AuthPasswordInput
              name="password"
              placeholder="Password"
              className="mb-10"
            />
            <Button
              type="submit"
              variant="filled"
              className="p-4 w-full flex items-center justify-center"
            >
              Log In
            </Button>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
}
