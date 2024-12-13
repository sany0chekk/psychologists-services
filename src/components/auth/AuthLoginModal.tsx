import React, { useEffect } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import Button from "../ui/Button";
import Input from "../ui/Input";
import AuthPasswordInput from "./AuthPasswordInput";
import ModalTitle from "../modal/ModalTitle";
import ModalDescr from "../modal/ModalDescr";
import Modal from "../modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { googleSignIn, login } from "../../redux/user/operations";
import { selectIsAuthorized } from "../../redux/user/selectors";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export default function AuthLoginModal({ isOpen, closeModal }: Props) {
  const isAuthorized = useSelector(selectIsAuthorized);
  const dispatch = useDispatch<AppDispatch>();
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
    dispatch(login({ email: values.email, password: values.password }));
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
              className="p-4 w-full flex items-center justify-center mb-4"
            >
              Log In
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
              <span className="text-dark">Login with Google</span>
            </button>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
}
