import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Button from "../components/Button";
import Loading from "../components/Loader";
import Textbox from "../components/Textbox";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isFlipped, setIsFlipped] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      navigate("/");
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  const resetPassword = async (data) => {
    // Implement your reset password logic
    console.log("Reset Password Data:", data);
    // On success:
    // navigate('/dashboard');
  };

  const toggleForm = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <Helmet>
        <script
          src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
          type="module"
        ></script>
      </Helmet>

      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        {/* STANGA */}
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600">
              Hierarchical Project Management
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
              <span>TreeTask</span>
              <span>ATM</span>
              <span>Project-Manager</span>
            </p>

            {/* <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div> */}
            {/* Animation Container */}
            <div className="animation-container">
              <dotlottie-player
                src="https://lottie.host/5a35dec6-ec10-4ec5-9fbe-101f6e5764d3/t7pvG354Rq.json"
                background="transparent"
                speed="1"
                style={{ width: "150px", height: "150px" }}
                loop
                autoplay
              ></dotlottie-player>
            </div>
          </div>
        </div>

        {/* DREAPTA */}

        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <div className="circle rotate-in-up-left"></div>

          <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
            <div className="flip-card-inner">
              {/* Login Form */}
              <div className="flip-card-front">
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
                >
                  <div className="">
                    <div className="animation-container"></div>
                    <p className="text-blue-600 text-3xl font-bold text-center">
                      Welcome!
                    </p>
                    <p className="text-center text-base text-gray-700">
                      What plans do you have for today?
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-5">
                    <Textbox
                      placeholder="Email@example.com"
                      type="email"
                      name="email"
                      label="Email"
                      className="w-full rounded-full"
                      register={register("email", {
                        required: "Field required",
                      })}
                      error={errors.email ? errors.email.message : null}
                    />

                    <Textbox
                      placeholder="Password"
                      type="password"
                      name="password"
                      label="Password"
                      className="w-full rounded-full"
                      register={register("password", {
                        required: "Field required",
                      })}
                      error={errors.password ? errors.password.message : null}
                    />

                    <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
                      Forgot password?
                    </span>
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <Button
                        type="submit"
                        label="Submit"
                        className="w-full h-10 bg-blue-700 text-white rounded-full"
                      />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
