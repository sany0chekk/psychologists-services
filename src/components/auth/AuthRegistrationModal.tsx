import React, { useEffect } from "react";
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import Button from "../ui/Button";
import Input from "../ui/Input";
import AuthPasswordInput from "./AuthPasswordInput";
import ModalTitle from "../modal/ModalTitle";
import ModalDescr from "../modal/ModalDescr";
import Modal from "../modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { googleSignIn, register } from "../../redux/user/operations";
import { selectIsAuthorized } from "../../redux/user/selectors";

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
  const isAuthorized = useSelector(selectIsAuthorized);

  const dispatch = useDispatch<AppDispatch>();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const result = await dispatch(
        register({
          email: values.email,
          password: values.password,
          name: values.name,
        })
      );
      if (register.fulfilled.match(result)) {
        closeModal();
        resetForm();
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
    closeModal();
    resetForm();
  };

  const handleGoogleAuth = () => dispatch(googleSignIn());

  useEffect(() => {
    if (isAuthorized) {
      closeModal();
    }
  }, [isAuthorized, closeModal]);

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
            <div className="mb-4">
              <Input name="name" type="text" placeholder="Name" />
              <ErrorMessage
                name="name"
                component="span"
                className="font-medium text-red-500 pl-2"
              />
            </div>
            <div className="mb-4">
              <Input name="email" type="email" placeholder="Email" />
              <ErrorMessage
                name="email"
                component="span"
                className="font-medium text-red-500 pl-2"
              />
            </div>
            <div className="mb-10">
              <AuthPasswordInput name="password" placeholder="Password" />
              <ErrorMessage
                name="password"
                component="span"
                className="font-medium text-red-500 pl-2"
              />
            </div>
            <Button
              type="submit"
              variant="filled"
              className="p-4 w-full flex items-center justify-center mb-4"
            >
              Sign Up
            </Button>
            <button
              onClick={handleGoogleAuth}
              className="w-full p-4 flex items-center justify-center gap-2 rounded-full border-2 transition-colors hover:bg-bg"
            >
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span className="text-dark">Sign Up with Google</span>
            </button>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
}
