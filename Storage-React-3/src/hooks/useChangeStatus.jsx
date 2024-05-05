import { useState } from "react";

import { changeStatus } from "../services/api";

import toast from "react-hot-toast";

export const useChangeStatus = () => {

    const [statusChanged, setStatusChange] = useState(null)

    const updateStatus = async (id) => {
        const response = await changeStatus(id)
        if (response.error) {
            if (response?.err?.response?.data?.errors) {
                let arr = response?.err?.response?.data?.errors
                for (const error of arr) {
                    return toast.error(
                        error.msg
                    )
                }
            }
            return toast.error(
                response?.err?.response?.data?.msg ||
                response?.err?.data?.msg ||
                'Error al cambiar estado.'
            )
        }
        console.log(response)
    }

    return {
        statusChanged,
        isFetching: !statusChanged,
        updateStatus
    }
}
