import { Form, Button, Spinner } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useResetPasswordAPIMutation } from "../store/slices/userApiSlice";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const navigate = useNavigate();
    let { token } = useParams();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [resetpasswordAPI, { isLoading }] = useResetPasswordAPIMutation();

    const submitHandler = async (event) => {
        event.preventDefault();
        if(!password || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Password & confirm password should match");
            return;
        }
        try {
            const response = await resetpasswordAPI({ password, token}).unwrap();
            setPassword("");
            setConfirmPassword("");
            toast.success(response.message);
            navigate("/login", { replace: true });
            
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
        };
  return (
    <FormContainer>
        <h1 className="text-center fw-bold mb-3 text-primary">Reset Password</h1>
      <Form>
        <Form.Group className="my-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control 
           type="email" 
           placeholder="Enter email" 
           value={password}
           onChange={(event) => setPassword(event.target.value)}
        />
        </Form.Group>
        <Form.Group className="my-3" controlId="password">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control 
           type="email" 
           placeholder="Enter email" 
           value={confirmPassword}
           onChange={(event) => setConfirmPassword(event.target.value)}
        />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          onClick={submitHandler}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ResetPassword
