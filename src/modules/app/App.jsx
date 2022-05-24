import "./App.scss"

import PropTypes from "prop-types"
import React, { useState } from "react"

// Components
import Button from "@ng-mw/reol/components/Button"
import Modal, { ModalBodyText } from "@ng-mw/reol/components/Modal"
import { ContactForm } from "@ng-mw/shared-react-components/contact-form"

const App = ({
    title = "Mobile App Starter",
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false)

    return (
        <div className="app">
            <h1 className="app__title">
                {title}
            </h1>
            <Button
                text="REOL"
                onClick={() => setIsModalVisible(true)}
            />
            <Modal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                header="REOL"
                buttons={[
                    {
                        text: "OK",
                    },
                ]}
            >
                <ModalBodyText>
                    Hello, my name is REOL!
                </ModalBodyText>
            </Modal>
            <ContactForm />
        </div>
    )
}

App.propTypes = {
    title: PropTypes.string,
}

export default App
