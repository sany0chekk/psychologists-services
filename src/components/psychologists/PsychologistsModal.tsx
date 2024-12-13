import React from "react";
import Modal from "../modal/Modal";
import ModalTitle from "../modal/ModalTitle";
import ModalDescr from "../modal/ModalDescr";
import { Psychologist } from "../../types/psychologist";
import { Form, Formik, FormikHelpers } from "formik";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface FormValues {
  name: string;
  number: string;
  time: string;
  email: string;
  comment: string;
}

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  psychologist: Psychologist | null;
}

export default function PsychologistsModal({
  isOpen,
  closeModal,
  psychologist,
}: Props) {
  if (!psychologist) return;
  const { name, surname, avatar_url } = psychologist;

  const initialValue = {
    name: "",
    number: "",
    time: "",
    email: "",
    comment: "",
  };

  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    closeModal();
    resetForm();
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} className="max-w-[600px]">
      <ModalTitle className="mb-5">
        Make an appointment with a psychologists
      </ModalTitle>
      <ModalDescr className="mb-10">
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </ModalDescr>
      <div className="flex items-center gap-3.5 mb-10">
        <img
          src={avatar_url}
          alt={`${name} ${surname}`}
          className="w-10 h-10 rounded-2xl"
        />
        <div>
          <p className="font-medium text-xs text-grey mb-1">
            Your psychologists
          </p>
          <h3 className="font-medium text-base text-dark leading-none">
            Dr. {name} {surname}
          </h3>
        </div>
      </div>
      <Formik initialValues={initialValue} onSubmit={handleSubmit}>
        <Form>
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-10">
            <Input
              name="name"
              type="text"
              placeholder="Name"
              className="col-span-2"
            />
            <Input
              name="number"
              type="text"
              placeholder="Number"
              className="col-span-1"
            />
            <Input
              name="time"
              type="text"
              placeholder="Time"
              className="col-span-1"
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="col-span-2"
            />
            <Input
              name="comment"
              type="textarea"
              placeholder="Comment"
              className="col-span-2 min-h-[116px]"
            />
          </div>
          <Button
            type="submit"
            variant="filled"
            className="p-4 w-full flex items-center justify-center"
          >
            Send
          </Button>
        </Form>
      </Formik>
    </Modal>
  );
}
