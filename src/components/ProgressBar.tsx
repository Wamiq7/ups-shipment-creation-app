import { Check } from "lucide-react";
import React from "react";

interface ProgressBarProps {
  currentStep: number;
  steps: string[];
}

export default function ProgressBar({ currentStep, steps }: ProgressBarProps) {
  const stepCount = steps.length;

  return (
    <div className="max-w-xl w-full mx-auto my-4">
      <div className="flex pb-3">
        {steps.map((_, index) => {
          const isActive = index + 1 <= currentStep; // Step is completed or current
          const isLast = index === stepCount - 1; // Last step has no connector
          const connectorWidth = `${100 / (stepCount - 1)}%`;

          return (
            <React.Fragment key={index}>
              <div className="flex-1">
                <div
                  className={`w-10 h-10 mx-auto rounded-full text-lg flex items-center justify-center ${
                    isActive
                      ? "bg-green-500 text-white"
                      : "bg-white border-2 border-gray-500 text-gray-500"
                  }`}
                >
                  <span className="text-center w-fit">
                    {isActive ? <Check /> : index + 1}
                  </span>
                </div>
              </div>
              {!isLast && (
                <div className="w-1/6 align-center items-center align-middle content-center flex">
                  <div className="w-full bg-gray-500 rounded items-center align-middle align-center flex-1">
                    <div
                      className={`text-xs leading-none py-1 text-center rounded ${
                        index + 1 < currentStep ? "bg-green-400" : "bg-gray-500"
                      }`}
                      //   style={{ width: connectorWidth }}
                    ></div>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="flex text-xs content-center text-center">
        {steps.map((label, index) => (
          <div key={index} className="flex-1">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
