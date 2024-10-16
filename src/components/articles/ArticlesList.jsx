import {Link} from "react-router-dom";
import {ArticleItem} from "./ArticlesItem.jsx";
export const ArticlesList = ({articles}) => {
    return (
            <div className="block-articles">
                <ul className="list-articlrs">
                    {articles.map((article, id) => {
                        return <li className="item-article" key={id}>
                            <Link to={`/article/${article.id}`}>
                                <ArticleItem
                                    title={article.title}
                                    create={article.created}
                                    image={article.image}/>
                            </Link>
                        </li>
                    })}
                </ul>
            </div>
    )
}