import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-small">
        {/* ------ left section----- */}
        <div>
          <img src={assets.logo} className="mb-5 w-40" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            EasyClinic connects patients with trusted healthcare professionals
            through secure and easy appointment booking. Our goal is to make
            healthcare access faster, simpler, and more reliable — all in just a
            few clicks.
          </p>
        </div>

        {/* ------ center section----- */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* ------ right section----- */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91-xxxxxxxxxx</li>
            <li>abc@example.com</li>
          </ul>
        </div>
      </div>
      {/* -----copyright---- */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025 @ Satyam.dev - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
