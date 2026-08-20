import React from "react";
import { useState } from "react";
import { Listbox, ListboxItem, Chip, ScrollShadow, Avatar } from "@nextui-org/react";

export default function ContactList() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const contacts = [
        { id: "u-001", name: "Alex Smith", last_seen: new Date(2023, 0, 12, 10, 30, 0) },
        { id: "u-002", name: "John Doe", last_seen: new Date(2023, 1, 5, 15, 45, 0) },
        { id: "u-003", name: "Jane Doe", last_seen: new Date(2023, 2, 20, 8, 0, 0) },
        { id: "u-004", name: "Alice Johnson", last_seen: new Date(2023, 3, 8, 12, 15, 0) },
        { id: "u-005", name: "Bob Williams", last_seen: new Date(2023, 4, 15, 18, 30, 0) },
        { id: "u-006", name: "Eva Davis", last_seen: new Date(2023, 5, 3, 9, 45, 0) },
        { id: "u-007", name: "Charlie Brown", last_seen: new Date(2023, 6, 18, 14, 0, 0) },
        { id: "u-008", name: "Grace Miller", last_seen: new Date(2023, 7, 11, 11, 20, 0) },
        { id: "u-009", name: "Daniel Lee", last_seen: new Date(2023, 8, 26, 16, 35, 0) },
        { id: "u-011", name: "Liam Johnson", last_seen: new Date(2023, 10, 30, 7, 45, 0) },
        { id: "u-012", name: "Olivia Taylor", last_seen: new Date(2023, 11, 22, 13, 55, 0) },
        { id: "u-010", name: "Sophia Wilson", last_seen: new Date(2023, 9, 4, 20, 10, 0) },
    ];
    const formatRelativeDate = (date) => {
        const now = new Date();
        const diffInMilliseconds = now - date;
        const diffInMinutes = Math.floor(diffInMilliseconds / (60 * 1000));

        if (diffInMinutes < 1) {
            return 'Just now';
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
        } else if (diffInMinutes < 24 * 60) {
            return `${Math.floor(diffInMinutes / 60)} hour${Math.floor(diffInMinutes / 60) === 1 ? '' : 's'} ago`;
        } else if (diffInMinutes < 7 * 24 * 60) {
            const options = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
            return `Yesterday at ${date.toLocaleString('en-US', options)}`;
        } else {
            const diffInDays = Math.floor(diffInMinutes / (24 * 60));
            return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
        }
    };
    return (
        <div className="w-full max-w-[460px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 m-auto">
            <Listbox
                classNames={{
                    list: "max-h-[80vh] overflow-scroll",
                }}
                defaultSelectedKeys={["1"]}
                items={contacts}
                label="Assigned to"
                variant="flat"
            >
                {(item) => (
                    <ListboxItem key={item.id} textValue={item.name}>
                        <div className="flex gap-2 items-center">
                            <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
                            <div className="flex flex-col">
                                <span className="text-small text-start">{item.name}</span>
                                <span className="text-tiny text-default-400">{formatRelativeDate(item.last_seen)}</span>
                            </div>
                        </div>
                    </ListboxItem>
                )}
            </Listbox>
        </div>
    );
}