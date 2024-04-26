import React from "react";

const About = () => {
  return (
    <div className="mt-4 text-center d-flex flex-column align-items-center">
      <h1 className="bg-info w-50 text-white p-2 rounded">
        About Our Task Management System
      </h1>

      <div className="mb-3 w-75">
        <div className="bg-secondary text-white">Introduction</div>
        <div>
          <div>
            Our task management system is designed to streamline the process of
            managing tasks across different users within an organization,
            specifically tailored for admins and workers.
          </div>
        </div>
      </div>

      <div className="mb-3 w-75">
        <div className="bg-secondary text-white">
          User Roles and Interactions
        </div>
        <div>
          <div className="h3">Admin Users:</div>
          <div>
            As the supervisors, admins have the capability to log in to the
            system, select any worker from the database, and assign tasks by
            choosing a date. Upon assignment, they can fill out task details
            which are then communicated to the worker. Admins manage the status
            of tasks and have special controls for updating or deleting tasks as
            needed.
          </div>
          <div>Regular Users (Workers):</div>
          <div>
            Workers have access to view all tasks assigned to them. They can
            update the status of the tasks by submitting their conclusions upon
            completion of the tasks. They play a crucial role in keeping the
            task statuses updated to "Pending" and eventually "Completed" after
            admin approval.
          </div>
        </div>
      </div>

      <div className="w-75">
        <div className="bg-secondary text-white">Task Status Descriptions</div>
        <div>
          <div>
            <strong>Open:</strong> A task is initially set to "Open" when
            assigned to a worker by an admin.
          </div>
          <div>
            <strong>Pending:</strong> Once a worker submits their job, the task
            status changes to "Pending", indicating that it awaits admin review.
          </div>
          <div>
            <strong>Completed:</strong> A task is marked "Completed" when an
            admin reviews and approves the completion of the task.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
