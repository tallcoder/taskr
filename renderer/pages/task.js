'use strict'

// Packages
import { Component } from 'react'
import Link from 'next/link'

// Layouts
import Page from './../layouts/page'

// Components
import Row from './../components/row'
import Hero from './../components/hero'
import Input from './../components/input'
import Button from './../components/button'

// Services
import { getUser } from './../services/api'

class Task extends Component {
  constructor() {
    super()

    this.state = { title: '', description: '' }
  }

  componentDidMount() {
    const { url: { query: { id } } } = this.props
    const { user } = getUser()
    const { title, description } = user.tasks.filter(task => task.id === id)[0]

    if (title) {
      return this.setState({ title, description })
    }
  }

  render() {
    const { title, description } = this.state
    const { url: { query: { id } } } = this.props

    return (
      <Page>
        <Row>
          <section>
            <Hero type="Task details" />

            <form>
              <fieldset>
                <Input
                  label="Title"
                  name="title"
                  placeholder={title}
                  size="large"
                  autoFocus={true}
                  onChange={this.inputChange}
                  value={title}
                  inputRef="title"
                  readOnly={true}
                />

                <Input
                  label="Description"
                  name="description"
                  placeholder={description}
                  multiline={true}
                  onChange={this.inputChange}
                  value={description}
                  inputRef="description"
                  readOnly={true}
                />
              </fieldset>

              <footer>
                <Link href="/start" prefetch>
                  <span>Back</span>
                </Link>

                <Link href={`/edit?id=${id}`} prefetch>
                  <Button>Edit task</Button>
                </Link>
              </footer>
            </form>
          </section>
        </Row>

        <style jsx>{`
          section {
            display: flex;
            flex-direction: column;
            jutify-content: space-between;
            min-height: 500px;
          }

          form {
            height: 414px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          span {
            display: block;
            width: 100%;
            color: #aaa;
            height: 36px;
            font-weight: 600;
            font-size: 10px;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-align: center;
            transition: 0.2s all;
          }

          span:hover {
            color: white;
          }
        `}</style>
      </Page>
    )
  }
}

export default Task
