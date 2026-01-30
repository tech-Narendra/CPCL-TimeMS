import React, { useState } from "react";
import ApplyLeaveModal from "../components/ApplyLeaveModal";
import ApplyPermissionModal from "../components/ApplyPermissionModal";
import ApplyOnDutyModal from "../components/ApplyOnDutyModal";
import ApplyOvertimeModal from "../components/ApplyOvertimeModal";
import ChangeShiftModal from "../components/ChangeShiftModal";

export default function QuickActions() {
  const [activeModal, setActiveModal] = useState(null);
 

  const actions = [
    { label: "Apply Leave", icon: "➕", key: "LEAVE" },
    { label: "Permission", icon: "⏳", key: "PERMISSION" },
    { label: "On Duty", icon: "💼", key: "ONDUTY" },
    { label: "Overtime", icon: "💰", key: "OVERTIME" },
    { label: "Shift Change", icon: "🔁", key: "SHIFT" },
  ];

  const handleActionClick = (key) => {
    setActiveModal(key);
};


  return (
    <>
      <div className="quick-actions">
        <h2 className="qa-title">Quick Actions</h2>

        <div className="qa-grid">
          {actions.map((action, index) => (
            <div
              key={index}
              className="qa-card"
              onClick={() => handleActionClick(action.key)}
            >
              <div className="qa-icon">{action.icon}</div>
              <div className="qa-label">{action.label}</div>
            </div>
          ))}
        </div>
      </div>

      {activeModal === "LEAVE" && (
        <ApplyLeaveModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === "PERMISSION" && (
        <ApplyPermissionModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === "ONDUTY" && (
        <ApplyOnDutyModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === "OVERTIME" && (
        <ApplyOvertimeModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === "SHIFT" && (
        <ChangeShiftModal onClose={() => setActiveModal(null)} />
      )}
    </>
  );
}
