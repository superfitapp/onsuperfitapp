import Image from "next/image";
import { PostOrPage } from "@tryghost/content-api";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
dayjs.extend(relativeTime);
dayjs.extend(calendar);
import "dayjs/locale/en"; // import locale

class AuthorRow extends React.Component<PostOrPage, any> {
  render() {
    const post = this.props;
    return (
      <div className="row align-items-center py-5 border-top border-bottom">
        <div className="col-auto">
          {post.authors && post.authors[0] && (
            <div className="avatar avatar-lg">
              <Image
                src={post.authors[0].profile_image}
                alt="..."
                className="avatar-img rounded-circle"
                height="100"
                width="100"
              />
            </div>
          )}
        </div>

        <div className="col ms-n5">
          {/* Name */}
          {post.authors && post.authors[0] && (
            <h6 className="text-uppercase mb-0">{post.authors[0].name}</h6>
          )}

          {/* Date */}
          <time className="font-size-sm text-muted">
            {dayjs(new Date(post.published_at)).fromNow()}
          </time>
        </div>

        <div className="col-auto">
          {/* Share */}
          <span className="h6 text-uppercase text-muted d-none d-md-inline me-4">
            Share:
          </span>
          {/* Icons */}
          <ul className="d-inline list-unstyled list-inline list-social">
            <li className="list-inline-item list-social-item me-3">
              <a href="#!" className="text-decoration-none">
                <img
                  src="/img/icons/social/instagram.svg"
                  className="list-social-icon"
                  alt="..."
                />
              </a>
            </li>
            <li className="list-inline-item list-social-item me-3">
              <a href="#!" className="text-decoration-none">
                <img
                  src="/img/icons/social/facebook.svg"
                  className="list-social-icon"
                  alt="..."
                />
              </a>
            </li>
            <li className="list-inline-item list-social-item me-3">
              <a href="#!" className="text-decoration-none">
                <img
                  src="/img/icons/social/twitter.svg"
                  className="list-social-icon"
                  alt="..."
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default AuthorRow;
