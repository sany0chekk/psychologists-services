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
  name: string;
  email: string;
  password: string;
}

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export default function AuthRegistrationModal({ isOpen, closeModal }: Props) {
  const initialValues = {
    name: "",
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
        <ModalTitle className="mb-5">Registration</ModalTitle>
        <ModalDescr className="mb-10">
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </ModalDescr>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Input
              name="name"
              type="text"
              placeholder="Name"
              className="mb-4"
            />
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
              Sign Up
            </Button>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
}
