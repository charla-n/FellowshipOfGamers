import * as React from "react";

const RankRequirement = ({ Resource, ResourceShouldUpdate, Rank }) => {

    switch (Rank) {
        case 0:
            return (
                <div>
                    <ul>
                        <li>{Resource ? Resource.undeadreq1 : ""}</li>
                    </ul>
                </div>
            )
        case 1:
            return (
                <div>
                    <ul>
                        <li>{Resource ? Resource.noobreq1 : ""}</li>
                        <li>{Resource ? Resource.noobreq2 : ""}</li>
                    </ul>
                    <h4 className={'small-margin-top'}>{Resource ? Resource.bonus : ""}</h4>
                    <ul>
                        <li>{Resource ? Resource.noobbonus1 : ""}</li>
                    </ul>
                </div>
            )
    case 2:
        return (
            <ul>
                <li>{Resource ? Resource.recruitreq1 : ""}</li>
                <li>{Resource ? Resource.recruitreq2 : ""}</li>
            </ul>
        )
    case 3:
        return (
            <ul>
                <li>{Resource ? Resource.warriorreq1 : ""}</li>
                <li>{Resource ? Resource.warriorreq2 : ""}</li>
                <li>{Resource ? Resource.warriorreq3 : ""}</li>
            </ul>
        )
    case 4:
        return (
            <ul>
                <li>{Resource ? Resource.knightreq1 : ""}</li>
                <li>{Resource ? Resource.knightreq2 : ""}</li>
                <li>{Resource ? Resource.knightreq3 : ""}</li>
                <li>{Resource ? Resource.knightreq4 : ""}</li>
            </ul>
        )
    case 5:
        return (
            <ul>
                <li>{Resource ? Resource.kingreq1 : ""}</li>
                <li>{Resource ? Resource.kingreq2 : ""}</li>
                <li>{Resource ? Resource.kingreq3 : ""}</li>
                <li>{Resource ? Resource.kingreq4 : ""}</li>
            </ul>
        )
    case 6:
        return (
            <ul>
                <li>{Resource ? Resource.emperorreq1 : ""}</li>
                <li>{Resource ? Resource.emperorreq2 : ""}</li>
                <li>{Resource ? Resource.emperorreq3 : ""}</li>
                <li>{Resource ? Resource.emperorreq4 : ""}</li>
                <li>{Resource ? Resource.emperorreq5 : ""}</li>
                <li>{Resource ? Resource.emperorreq6 : ""}</li>
            </ul>
        )
    default:
        return (<ul></ul>)
    }
}
export default RankRequirement;